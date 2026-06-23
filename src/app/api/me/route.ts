import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAnonUser, setAnonCookieIfNeeded } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await resolveAnonUser(req);
    const res = NextResponse.json({
      user: {
        id: user.id, name: user.name, avatar: user.avatar, xp: user.xp, level: user.level,
        levelProgress: (user.xp % 500) / 500, xpToNext: 500 - (user.xp % 500),
        totalQuizzes: user.totalQuizzes, totalCorrect: user.totalCorrect,
        bestStreak: user.bestStreak, dailyStreak: user.dailyStreak, lastDailyAt: user.lastDailyAt,
      },
    });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await resolveAnonUser(req);
    const body = await req.json().catch(() => ({}));
    const updates: any = {};
    if (typeof body.name === 'string' && body.name.trim().length > 0 && body.name.length <= 30) updates.name = body.name.trim();
    if (typeof body.avatar === 'string' && body.avatar.length <= 10) updates.avatar = body.avatar;
    if (Object.keys(updates).length > 0) {
      await db.user.update({ where: { id: user.id }, data: updates });
    }
    const res = NextResponse.json({ ok: true });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
