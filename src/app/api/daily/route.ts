import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUIZZES, getLocalized, type Lang } from '@/lib/quiz-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get('lang') as Lang) || 'en';
  const validLang: Lang = ['en', 'ru', 'es', 'de', 'fr'].includes(lang) ? lang : 'en';
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const daily = SEED_QUIZZES[dayOfYear % SEED_QUIZZES.length];
  return NextResponse.json({
    daily: {
      slug: daily.slug, title: getLocalized(daily.title, validLang), description: getLocalized(daily.description, validLang),
      category: getLocalized(daily.category, validLang), difficulty: daily.difficulty, icon: daily.icon, color: daily.color,
      questionCount: daily.questions.length, isDaily: true,
    },
  });
}
