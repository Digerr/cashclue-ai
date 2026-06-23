import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAnonUser, setAnonCookieIfNeeded } from '@/lib/auth';
import { SEED_QUIZZES } from '@/lib/quiz-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await resolveAnonUser(req);

    // Get all user attempts with quiz slug
    const attempts = await db.quizAttempt.findMany({
      where: { userId: user.id },
      select: { quizSlug: true, correctCount: true, totalCount: true, score: true, mode: true, completedAt: true },
      orderBy: { completedAt: 'desc' },
    });

    // Map quiz slug → category
    const slugToCategory: Record<string, string> = {};
    const slugToTitle: Record<string, { en: string; ru: string }> = {};
    SEED_QUIZZES.forEach(q => {
      slugToCategory[q.slug] = q.category.en;
      slugToTitle[q.slug] = q.title;
    });

    // Aggregate by category
    const categoryStats: Record<string, { played: number; correct: number; total: number; xp: number }> = {};
    attempts.forEach(a => {
      const cat = slugToCategory[a.quizSlug] || 'Unknown';
      if (!categoryStats[cat]) categoryStats[cat] = { played: 0, correct: 0, total: 0, xp: 0 };
      categoryStats[cat].played++;
      categoryStats[cat].correct += a.correctCount;
      categoryStats[cat].total += a.totalCount;
      categoryStats[cat].xp += a.score;
    });

    // Convert to array with accuracy
    const categories = Object.entries(categoryStats).map(([cat, stats]) => ({
      category: cat,
      played: stats.played,
      correct: stats.correct,
      total: stats.total,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      xp: stats.xp,
    })).sort((a, b) => b.played - a.played);

    // Recent attempts (last 5)
    const recent = attempts.slice(0, 5).map(a => ({
      slug: a.quizSlug,
      title: slugToTitle[a.quizSlug]?.en || a.quizSlug,
      correct: a.correctCount,
      total: a.totalCount,
      score: a.score,
      mode: a.mode,
      date: a.completedAt,
    }));

    // Overall accuracy
    const totalCorrect = attempts.reduce((s, a) => s + a.correctCount, 0);
    const totalQuestions = attempts.reduce((s, a) => s + a.totalCount, 0);
    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const res = NextResponse.json({
      categories,
      recent,
      overallAccuracy,
      totalAttempts: attempts.length,
    });
    setAnonCookieIfNeeded(req, res, user);
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
