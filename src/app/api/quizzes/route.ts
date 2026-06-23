import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUIZZES, getLocalized, type Lang } from '@/lib/quiz-data';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get('lang') as Lang) || 'en';
  const validLang: Lang = ['en', 'ru', 'es', 'de', 'fr'].includes(lang) ? lang : 'en';

  const quizzes = SEED_QUIZZES.map((q) => ({
    slug: q.slug,
    title: getLocalized(q.title, validLang),
    description: getLocalized(q.description, validLang),
    category: getLocalized(q.category, validLang),
    difficulty: q.difficulty,
    icon: q.icon,
    color: q.color,
    isPremium: q.isPremium ?? false,
    questionCount: q.questions.length,
  }));

  return NextResponse.json({ quizzes });
}
