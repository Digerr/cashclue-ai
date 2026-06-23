'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { QuizPlayer } from '@/components/brainbolt/quiz-player';

export default function PlayPageWrapper() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading...</div>}>
      <PlayPage />
    </Suspense>
  );
}

function PlayPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params.slug;
  const mode = (searchParams.get('mode') as 'classic' | 'time-attack' | 'survival') || 'classic';
  const isDaily = searchParams.get('daily') === '1';

  return <QuizPlayer slug={slug} mode={mode} isDaily={isDaily} />;
}
