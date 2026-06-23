import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SEED_QUIZZES } from '@/lib/quiz-data';
import { resolveAnonUser, setAnonCookieIfNeeded, trackEvent, calcQuestionScore, levelFromXp } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 30;

const DIFFICULTY_MULT: Record<string, number> = { easy: 1, medium: 1.25, hard: 1.5 };

export async function POST(req: NextRequest) {
  let user;
  try {
    user = await resolveAnonUser(req);
    const body = await req.json();
    const quizSlug = String(body.quizSlug ?? '');
    const mode = body.mode === 'time-attack' || body.mode === 'survival' ? body.mode : 'classic';
    const answers = Array.isArray(body.answers) ? body.answers : [];
    if (!quizSlug || answers.length === 0) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    const quiz = SEED_QUIZZES.find((q) => q.slug === quizSlug);
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    const difficultyMult = DIFFICULTY_MULT[quiz.difficulty] || 1;
    const isFirstQuiz = user.totalQuizzes === 0;
    const firstQuizMult = isFirstQuiz ? 2 : 1;

    let correctCount = 0, totalScore = 0, maxStreak = 0, currentStreak = 0;
    const answerDetails: any[] = [];

    for (const ans of answers) {
      const match = ans.questionId.match(/-q(\d+)$/);
      if (!match) continue;
      const qIdx = parseInt(match[1], 10);
      const question = quiz.questions[qIdx];
      if (!question) continue;

      const isCorrect = ans.selectedIndex === question.correctIndex;
      if (isCorrect) {
        correctCount++;
        currentStreak++;
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        const baseScore = calcQuestionScore(true, ans.timeMs, question.timeLimit || 15, currentStreak);
        totalScore += Math.round(baseScore * difficultyMult * firstQuizMult);
      } else {
        currentStreak = 0;
      }
      answerDetails.push({
        questionId: ans.questionId, text: question.text, options: question.options,
        selectedIndex: ans.selectedIndex, correctIndex: question.correctIndex,
        isCorrect, explanation: question.explanation || null, timeMs: ans.timeMs,
      });
    }

    const totalCount = quiz.questions.length;
    const totalTimeMs = answers.reduce((s, a) => s + a.timeMs, 0);
    const perfectScore = correctCount === totalCount;
    const newTotalQuizzes = user.totalQuizzes + 1;
    const newXp = user.xp + totalScore;
    const newLevel = levelFromXp(newXp);
    const newBestStreak = Math.max(user.bestStreak, maxStreak);
    const leveledUp = newLevel > user.level;

    let newDailyStreak = user.dailyStreak;
    const isDaily = body.isDaily === true;
    if (isDaily) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const last = user.lastDailyAt ? new Date(user.lastDailyAt) : null;
      if (last) {
        last.setHours(0, 0, 0, 0);
        const diff = Math.round((today.getTime() - last.getTime()) / 86400000);
        if (diff === 1) newDailyStreak = user.dailyStreak + 1;
        else if (diff === 2 && user.streakFreeze > 0) newDailyStreak = user.dailyStreak + 1;
        else if (diff > 1) newDailyStreak = 1;
      } else { newDailyStreak = 1; }
    }

    const updated = await db.user.update({
      where: { id: user.id },
      data: { xp: newXp, level: newLevel, totalQuizzes: newTotalQuizzes, totalCorrect: user.totalCorrect + correctCount, bestStreak: newBestStreak, dailyStreak: newDailyStreak, lastDailyAt: isDaily ? new Date() : user.lastDailyAt },
    });

    await db.quizAttempt.create({ data: { userId: user.id, quizSlug: quiz.slug, mode, score: totalScore, correctCount, totalCount, maxStreak, timeMs: totalTimeMs, answers: JSON.stringify(answerDetails) } });
    await trackEvent(user.id, 'quiz_complete', { quizSlug, mode, score: totalScore, correctCount, perfect: perfectScore, firstQuiz: isFirstQuiz, leveledUp });

    const res = NextResponse.json({
      score: totalScore, correctCount, totalCount, maxStreak, timeMs: totalTimeMs, perfect: perfectScore, mode,
      answers: answerDetails,
      bonus: { difficultyMultiplier: difficultyMult, firstQuizBonus: isFirstQuiz, leveledUp, newLevel: leveledUp ? newLevel : null },
      userStats: { xp: newXp, level: newLevel, levelProgress: (newXp % 500) / 500, totalQuizzes: newTotalQuizzes, totalCorrect: user.totalCorrect + correctCount, bestStreak: newBestStreak, dailyStreak: newDailyStreak, streakFreeze: updated.streakFreeze },
    });
    setAnonCookieIfNeeded(req, res, updated);
    return res;
  } catch (e: any) {
    console.error('Attempt error:', e);
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 });
  }
}
