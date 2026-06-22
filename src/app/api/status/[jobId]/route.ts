import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/queue';
import { db } from '@/lib/db';
import { resolveAnonUser, setAnonCookieIfNeeded, trackEvent } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  if (!jobId || !jobId.startsWith('job_')) {
    return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Try to find user (best-effort — for analytics tracking on completion)
  let userId: string | null = null;
  try {
    const res = NextResponse.json({});
    const user = await resolveAnonUser(req, res);
    setAnonCookieIfNeeded(req, res, user);
    userId = user.id;
  } catch {}

  const response: any = {
    jobId: job.id,
    status: job.status,
    position: job.position,
    queuedAt: job.queuedAt,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
  };

  if (job.status === 'completed') {
    const result = job.result as any;
    response.result = result;
    response.latencyMs = job.completedAt! - job.queuedAt;

    // Persist plan to DB (best-effort, fire-and-forget)
    if (userId && result) {
      db.generatedPlan
        .create({
          data: {
            userId,
            theme: (job.payload as any).theme ?? 'sideHustle',
            lang: (job.payload as any).lang ?? 'en',
            input: JSON.stringify(job.payload),
            output: JSON.stringify(result),
            latencyMs: job.completedAt! - job.startedAt!,
            success: true,
          },
        })
        .catch(() => {});
      trackEvent(userId, 'generate_success', {
        latencyMs: job.completedAt! - job.startedAt!,
      }).catch(() => {});
    }
  } else if (job.status === 'failed') {
    response.error = job.error;
    response.latencyMs = job.completedAt! - job.queuedAt;

    if (userId) {
      trackEvent(userId, 'generate_error', { error: job.error }).catch(() => {});
      // Refund credit on failure
      db.anonymousUser
        .update({
          where: { id: userId },
          data: { credits: { increment: 1 } },
        })
        .catch(() => {});
    }
  }

  return NextResponse.json(response);
}
