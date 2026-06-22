import { NextRequest, NextResponse } from 'next/server';
import { resolveAnonUser, setAnonCookieIfNeeded } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const res = NextResponse.json({});
  try {
    const user = await resolveAnonUser(req, res);
    setAnonCookieIfNeeded(req, res, user);
    return NextResponse.json({ credits: user.credits });
  } catch {
    return NextResponse.json({ credits: 0 }, { status: 500 });
  }
}
