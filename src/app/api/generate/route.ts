import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded, decrementCredits, trackEvent, ANON_COOKIE_NAME } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { createJob } from '@/lib/queue';
import type { HustleInput } from '@/lib/ai';
import type { ThemeId } from '@/lib/ai';
import type { Lang } from '@/lib/i18n';

export const runtime = 'nodejs';
export const maxDuration = 90;

const VALID_THEMES: ThemeId[] = ['sideHustle', 'startup', 'content', 'career', 'passive'];
const VALID_LANGS: Lang[] = ['en', 'ru', 'es', 'de', 'fr'];

export async function POST(req: NextRequest) {
  const t0 = Date.now();
  const res = NextResponse.json({});

  try {
    // Resolve anonymous user (creates cookie if new)
    const user = await resolveAnonUser(req, res);
    setAnonCookieIfNeeded(req, res, user);

    // Rate limit: 10 generations per hour per user (above free tier)
    const rl = rateLimit({
      key: `gen:${user.id}`,
      max: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Try again later or upgrade to Pro for unlimited.',
          retryAfterMs: rl.resetMs,
        },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.resetMs / 1000)) } }
      );
    }

    // Validate credits
    if (user.credits <= 0) {
      await trackEvent(user.id, 'generate_blocked_no_credits');
      return NextResponse.json(
        { error: 'no_credits', message: 'You have used all your free credits.' },
        { status: 402 }
      );
    }

    // Parse + validate body
    const body = await req.json().catch(() => ({}));
    const skills = String(body.skills ?? '').trim();
    const goal = String(body.goal ?? '').trim();

    if (!skills && !goal) {
      return NextResponse.json(
        { error: 'Please describe your skills or goal.' },
        { status: 400 }
      );
    }

    const theme: ThemeId = VALID_THEMES.includes(body.theme) ? body.theme : 'sideHustle';
    const lang: Lang = VALID_LANGS.includes(body.lang) ? body.lang : 'en';
    const riskTolerance = ['low', 'medium', 'high'].includes(body.riskTolerance)
      ? body.riskTolerance
      : 'medium';

    const input: HustleInput = {
      skills,
      hoursPerWeek: String(body.hoursPerWeek ?? '10'),
      budget: String(body.budget ?? '0'),
      goal,
      riskTolerance,
      theme,
      lang,
    };

    // Decrement credits atomically BEFORE queueing (refunded on failure)
    await decrementCredits(user.id);

    // Create job in queue
    const job = createJob(input);

    await trackEvent(user.id, 'generate_queued', { theme, lang, jobId: job.id, queuePosition: job.position });

    return NextResponse.json({
      jobId: job.id,
      position: job.position,
      status: job.status,
      creditsRemaining: user.credits - 1,
    });
  } catch (err: any) {
    console.error('Generate API error:', err);
    await trackEvent(null, 'generate_api_error', { error: String(err?.message ?? err) });
    return NextResponse.json(
      { error: err?.message || 'Something went wrong.' },
      { status: 500 }
    );
  }
}
