import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUIZZES, getLocalized, type Lang } from '@/lib/quiz-data';

export const runtime = 'nodejs';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = (req.nextUrl.searchParams.get('lang') as Lang) || 'en';
  const validLang: Lang = ['en', 'ru', 'es', 'de', 'fr'].includes(lang) ? lang : 'en';

  const quiz = SEED_QUIZZES.find((q) => q.slug === slug);
  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return NextResponse.json({
    quiz: {
      slug: quiz.slug,
      title: getLocalized(quiz.title, validLang),
      description: getLocalized(quiz.description, validLang),
      category: getLocalized(quiz.category, validLang),
      difficulty: quiz.difficulty,
      icon: quiz.icon,
      color: quiz.color,
      isPremium: quiz.isPremium ?? false,
      questions: quiz.questions.map((q, i) => ({
        id: `${quiz.slug}-q${i}`,
        text: getLocalized(q.text, validLang),
        options: q.options.map((o) => getLocalized(o, validLang)),
        timeLimit: q.timeLimit || 15,
        order: i,
      })),
    },
  });
}
