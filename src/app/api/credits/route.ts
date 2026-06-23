import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const user = await resolveAnonUser(req);
    // Build response AFTER resolving user so we can set the cookie if needed
    const res = NextResponse.json({ credits: user.credits });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e) {
    console.error('/api/credits error:', e);
    return NextResponse.json({ credits: 0, error: 'Failed to load credits' }, { status: 500 });
  }
}
