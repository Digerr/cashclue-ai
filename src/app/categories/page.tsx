'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Search, Shuffle, ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/components/brainbolt/language-context';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function CategoriesPageWrapper() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl px-4 py-20 text-center text-muted-foreground">Loading...</div>}>
      <CategoriesPage />
    </Suspense>
  );
}

function CategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useLang();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'difficulty' | 'az'>('popular');

  const mode = searchParams.get('mode') || 'classic';

  const quizzes = useMemo(() => SEED_QUIZZES.map(q => ({
    slug: q.slug,
    title: getLocalized(q.title, lang),
    description: getLocalized(q.description, lang),
    category: getLocalized(q.category, lang),
    difficulty: q.difficulty,
    icon: q.icon,
    color: q.color,
    questionCount: q.questions.length,
  })), [lang]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(quizzes.map(q => q.category)))], [quizzes]);

  let filtered = categoryFilter === 'all' ? quizzes : quizzes.filter(q => q.category === categoryFilter);
  if (searchQuery.trim()) {
    const sq = searchQuery.toLowerCase();
    filtered = filtered.filter(q => q.title.toLowerCase().includes(sq) || q.description.toLowerCase().includes(sq));
  }
  if (sortBy === 'az') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  else if (sortBy === 'difficulty') {
    const order: any = { easy: 0, medium: 1, hard: 2 };
    filtered = [...filtered].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }

  const playRandom = () => {
    const random = SEED_QUIZZES[Math.floor(Math.random() * SEED_QUIZZES.length)];
    router.push(`/quiz/${random.slug}?mode=${mode}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <h1 className="text-3xl font-bold">{t.quizzes_title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.quizzes_sub}</p>
        </div>
        <Button onClick={playRandom} variant="outline" className="font-semibold">
          <Shuffle className="h-4 w-4 mr-2" /> Random quiz
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input type="text" placeholder={t.quizzes_search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-9 pl-9 pr-3 rounded-md border border-border bg-background/60 text-sm w-full" />
        </div>
        <div className="flex gap-1.5">
          {(['popular', 'difficulty', 'az'] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)} className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wide font-medium transition-all ${sortBy === s ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {s === 'az' ? 'A-Z' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${categoryFilter === c ? 'bg-[var(--emerald-glow)] text-black' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
            {c === 'all' ? t.quizzes_all : c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <div className="font-medium">{t.quizzes_empty}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(quiz => (
            <QuizCard key={quiz.slug} quiz={quiz} t={t} mode={mode} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuizCard({ quiz, t, mode }: any) {
  const difficultyColors: Record<string, string> = {
    easy: 'text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40',
    medium: 'text-[var(--gold)] border-[var(--gold)]/40',
    hard: 'text-orange-400 border-orange-400/40',
  };
  return (
    <Link href={`/quiz/${quiz.slug}?mode=${mode}`}>
      <Card className="group border-border bg-card/60 backdrop-blur overflow-hidden transition-all hover:border-[var(--emerald-glow)]/40 hover:-translate-y-0.5 h-full">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: quiz.color + '20' }}>{quiz.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold leading-tight truncate">{quiz.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="outline" className="text-[10px] py-0 h-4">{quiz.category}</Badge>
                <Badge variant="outline" className={`text-[10px] py-0 h-4 ${difficultyColors[quiz.difficulty]}`}>{t[`difficulty_${quiz.difficulty}`]}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">{quiz.description}</p>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Target className="h-3 w-3" /> {quiz.questionCount} {t.quiz_questions}</span>
            <span className="text-xs font-semibold text-[var(--emerald-glow)]">Play →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
