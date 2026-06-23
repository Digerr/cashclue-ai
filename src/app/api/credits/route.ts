import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  let user: { id: string; cookie: string; credits: number } | null = null;
  try {
    user = (await resolveAnonUser(req)) as { id: string; cookie: string; credits: number };
    const res = NextResponse.json({ credits: user.credits });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e: any) {
    // Surface the error message so we can debug via the response body
    console.error('/api/credits error:', e);
    const res = NextResponse.json(
      {
        credits: 0,
        error: e?.message ?? 'Unknown error',
        stack: process.env.NODE_ENV === 'production' ? undefined : e?.stack?.split('\n').slice(0, 5),
      },
      { status: 500 }
    );
    if (user) setAnonCookieIfNeeded(req, res, user);
    return res;
  }
}
