import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded, decrementCredits, trackEvent } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { generateHustlePlan } from '@/lib/ai';
import { db } from '@/lib/db';
import type { HustleInput, ThemeId } from '@/lib/ai';
import type { Lang } from '@/lib/i18n';

export const runtime = 'nodejs';
export const maxDuration = 60; // Vercel Hobby tier hard limit

const VALID_THEMES: ThemeId[] = ['sideHustle', 'startup', 'content', 'career', 'passive'];
const VALID_LANGS: Lang[] = ['en', 'ru', 'es', 'de', 'fr'];

function jsonWithCookie(req: NextRequest, body: unknown, init?: ResponseInit, user?: { cookie: string }) {
  const res = NextResponse.json(body, init);
  if (user) setAnonCookieIfNeeded(req, res, user);
  return res;
}

export async function POST(req: NextRequest) {
  const t0 = Date.now();
  let user: { id: string; cookie: string; credits: number } | null = null;
  try {
    user = (await resolveAnonUser(req)) as { id: string; cookie: string; credits: number };

    // Rate limit: 10 generations per hour per user
    const rl = rateLimit({
      key: `gen:${user.id}`,
      max: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.allowed) {
      return jsonWithCookie(
        req,
        { error: 'rate_limited', message: 'Too many requests. Try again later.', retryAfterMs: rl.resetMs },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.resetMs / 1000)) } },
        user
      );
    }

    if (user.credits <= 0) {
      await trackEvent(user.id, 'generate_blocked_no_credits');
      return jsonWithCookie(
        req,
        { error: 'no_credits', message: 'You have used all your free credits.' },
        { status: 402 },
        user
      );
    }

    // Parse + validate body
    const body = await req.json().catch(() => ({}));
    const skills = String(body.skills ?? '').trim();
    const goal = String(body.goal ?? '').trim();

    if (!skills && !goal) {
      return jsonWithCookie(req, { error: 'Please describe your skills or goal.' }, { status: 400 }, user);
    }

    const theme: ThemeId = VALID_THEMES.includes(body.theme) ? body.theme : 'sideHustle';
    const lang: Lang = VALID_LANGS.includes(body.lang) ? body.lang : 'en';
    const riskTolerance = ['low', 'medium', 'high'].includes(body.riskTolerance) ? body.riskTolerance : 'medium';

    const input: HustleInput = {
      skills,
      hoursPerWeek: String(body.hoursPerWeek ?? '10'),
      budget: String(body.budget ?? '0'),
      goal,
      riskTolerance,
      theme,
      lang,
    };

    // Decrement credits BEFORE AI call (refunded on failure)
    await decrementCredits(user.id);

    await trackEvent(user.id, 'generate_started', { theme, lang });

    // Synchronous AI generation with retry on transient failures
    let plan;
    let lastError;
    let success = false;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        plan = await generateHustlePlan(input);
        success = true;
        break;
      } catch (e: any) {
        lastError = e;
        const msg = e?.message ?? '';
        const transient = /timeout|invalid JSON|429|rate limit|fetch failed|ECONNRESET|ETIMEDOUT/i.test(msg);
        if (!transient || attempt === 1) break;
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    if (!success || !plan) {
      // Refund credit on failure
      await db.anonymousUser.update({
        where: { id: user.id },
        data: { credits: { increment: 1 } },
      }).catch(() => {});
      await trackEvent(user.id, 'generate_error', { error: String(lastError?.message ?? lastError) });
      return jsonWithCookie(
        req,
        {
          error: 'generation_failed',
          message: lastError?.message || 'AI generation failed. Your credit was refunded.',
        },
        { status: 500 },
        user
      );
    }

    const latencyMs = Date.now() - t0;

    // Persist plan to DB (fire-and-forget)
    db.generatedPlan
      .create({
        data: {
          userId: user.id,
          theme,
          lang,
          input: JSON.stringify(input),
          output: JSON.stringify(plan),
          latencyMs,
          success: true,
        },
      })
      .catch((e) => console.error('Failed to persist plan:', e));

    await trackEvent(user.id, 'generate_success', { latencyMs, theme, lang });

    return jsonWithCookie(
      req,
      {
        plan,
        latencyMs,
        creditsRemaining: user.credits - 1,
      },
      { status: 200 },
      user
    );
  } catch (err: any) {
    console.error('Generate API error:', err);
    // Refund credit if we decremented but failed before AI completed
    if (user) {
      await db.anonymousUser.update({
        where: { id: user.id },
        data: { credits: { increment: 1 } },
      }).catch(() => {});
    }
    await trackEvent(null, 'generate_api_error', { error: String(err?.message ?? err) });
    return jsonWithCookie(req, { error: err?.message || 'Something went wrong.' }, { status: 500 }, user ?? undefined);
  }
}
