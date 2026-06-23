import { NextRequest, NextResponse } from 'next/server';
import { db } from './db';
import crypto from 'crypto';

export const ANON_COOKIE_NAME = 'cashclue_uid';
export const ANON_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function hashIp(ip: string): string {
  const salt = process.env.CASHCLUE_SALT || 'cashclue-default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').slice(0, 32);
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

/**
 * Resolve or create an anonymous user from the request cookie.
 * Does NOT set cookies on the response — caller must use setAnonCookieIfNeeded()
 * on the actual response they return.
 */
export async function resolveAnonUser(req: NextRequest) {
  const existingCookie = req.cookies.get(ANON_COOKIE_NAME)?.value;
  const ipHash = hashIp(getClientIp(req));
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null;

  if (existingCookie) {
    const user = await db.anonymousUser.findUnique({
      where: { cookie: existingCookie },
    });
    if (user) {
      // Update last seen async (fire-and-forget to avoid blocking response)
      db.anonymousUser
        .update({
          where: { id: user.id },
          data: { lastSeenAt: new Date(), ipHash, userAgent },
        })
        .catch(() => {});
      return user;
    }
  }

  // Create new anonymous user
  const newCookie = crypto.randomBytes(16).toString('hex');
  const user = await db.anonymousUser.create({
    data: {
      cookie: newCookie,
      credits: 3,
      ipHash,
      userAgent,
      lang: 'en',
    },
  });

  return user;
}

/** Set cookie on response if user is new (cookie didn't exist on request) */
export function setAnonCookieIfNeeded(req: NextRequest, res: NextResponse, user: { cookie: string }) {
  const existing = req.cookies.get(ANON_COOKIE_NAME)?.value;
  if (existing !== user.cookie) {
    res.cookies.set(ANON_COOKIE_NAME, user.cookie, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: ANON_COOKIE_MAX_AGE,
      path: '/',
    });
  }
}

export async function decrementCredits(userId: string): Promise<number> {
  const updated = await db.anonymousUser.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } },
    select: { credits: true },
  });
  return updated.credits;
}

export async function getCredits(userId: string): Promise<number> {
  const user = await db.anonymousUser.findUnique({
    where: { id: userId },
    select: { credits: true },
  });
  return user?.credits ?? 0;
}

export async function trackEvent(
  userId: string | null,
  name: string,
  properties?: Record<string, unknown>
) {
  try {
    await db.analyticsEvent.create({
      data: {
        userId,
        name,
        properties: properties ? JSON.stringify(properties) : null,
      },
    });
  } catch (e) {
    // Analytics failures should never break the user flow
    console.error('Analytics track failed:', e);
  }
}
