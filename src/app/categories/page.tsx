'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import { Search, Shuffle, ChevronLeft } from 'lucide-react';
import { useLang } from '@/components/brainbolt/language-context';
import { useFeedback } from '@/hooks/use-feedback';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading...</div>}>
      <CategoriesInner />
    </Suspense>
  );
}

function CategoriesInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useLang();
  const { trigger } = useFeedback();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
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

  let filtered = category === 'all' ? quizzes : quizzes.filter(q => q.category === category);
  if (search.trim()) {
    const sq = search.toLowerCase();
    filtered = filtered.filter(q => q.title.toLowerCase().includes(sq) || q.description.toLowerCase().includes(sq));
  }
  if (sortBy === 'az') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  else if (sortBy === 'difficulty') {
    const order: any = { easy: 0, medium: 1, hard: 2 };
    filtered = [...filtered].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }

  const playRandom = () => {
    trigger('select');
    const r = SEED_QUIZZES[Math.floor(Math.random() * SEED_QUIZZES.length)];
    router.push(`/quiz/${r.slug}?mode=${mode}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" onClick={() => trigger('tap')} className="press">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">{t.quizzes_title}</h1>
        <button onClick={playRandom} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium press hover:border-primary/30">
          <Shuffle className="h-3.5 w-3.5" /> Random
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={t.quizzes_search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-card border border-border rounded-xl text-sm focus:border-primary/40 focus:outline-none transition-colors"
        />
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 flex-wrap mb-3">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => { trigger('tap'); setCategory(c); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all press ${
              category === c ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground border border-border hover:text-foreground'
            }`}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-1.5 mb-5">
        {(['popular', 'difficulty', 'az'] as const).map(s => (
          <button
            key={s}
            onClick={() => { trigger('tap'); setSortBy(s); }}
            className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wide font-bold transition-colors press ${
              sortBy === s ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {s === 'az' ? 'A-Z' : s}
          </button>
        ))}
      </div>

      {/* Quiz grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">{t.quizzes_empty}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 stagger">
          {filtered.map(quiz => (
            <Link
              key={quiz.slug}
              href={`/quiz/${quiz.slug}?mode=${mode}`}
              onClick={() => trigger('select')}
              className="block p-4 rounded-xl bg-card border border-border lift press hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{quiz.icon}</span>
                <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  quiz.difficulty === 'easy' ? 'bg-primary/10 text-primary' :
                  quiz.difficulty === 'medium' ? 'bg-gold/10 text-gold' :
                  'bg-destructive/10 text-destructive'
                }`}>{quiz.difficulty}</span>
              </div>
              <div className="font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{quiz.title}</div>
              <div className="text-[10px] text-muted-foreground line-clamp-2 mb-2">{quiz.description}</div>
              <div className="text-[10px] font-mono text-muted-foreground">{quiz.questionCount}Q · {quiz.category}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
