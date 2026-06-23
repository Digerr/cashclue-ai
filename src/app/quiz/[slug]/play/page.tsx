'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { QuizPlayer } from '@/components/brainbolt/quiz-player';

export default function PlayPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params.slug;
  const mode = (searchParams.get('mode') as 'classic' | 'time-attack' | 'survival') || 'classic';
  const isDaily = searchParams.get('daily') === '1';

  return <QuizPlayer slug={slug} mode={mode} isDaily={isDaily} />;
}
