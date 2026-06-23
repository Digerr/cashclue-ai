import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const top = await db.user.findMany({
      where: { xp: { gt: 0 } },
      orderBy: { xp: 'desc' },
      take: 100,
      select: { id: true, name: true, avatar: true, xp: true, level: true, totalQuizzes: true, bestStreak: true },
    });
    return NextResponse.json({
      leaderboard: top.map((u, i) => ({
        rank: i + 1, id: u.id, name: u.name || `Player ${u.id.slice(-4)}`, avatar: u.avatar || '🎯',
        xp: u.xp, level: u.level, totalQuizzes: u.totalQuizzes, bestStreak: u.bestStreak,
      })),
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
