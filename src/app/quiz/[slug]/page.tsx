'use client';
import { ui } from '@/lib/ui-strings';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { ArrowLeft, Target, Zap, Skull, Clock, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/components/brainbolt/language-context';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function QuizPageWrapper() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading...</div>}>
      <QuizPage />
    </Suspense>
  );
}

function QuizPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, lang } = useLang();

  const slug = params.slug;
  const seed = SEED_QUIZZES.find(q => q.slug === slug);

  // Compute play mode from URL
  const urlMode = searchParams.get('mode');
  const selectedMode: 'classic' | 'time-attack' | 'survival' = urlMode === 'time-attack' ? 'time-attack' : urlMode === 'survival' ? 'survival' : 'classic';
  const [localMode, setLocalMode] = useState(selectedMode);
  const activeMode = localMode || selectedMode;

  if (!seed) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Quiz not found</p>
        <Button asChild><Link href="/categories">Browse quizzes</Link></Button>
      </div>
    );
  }

  const title = getLocalized(seed.title, lang);
  const description = getLocalized(seed.description, lang);
  const category = getLocalized(seed.category, lang);

  const modes = [
    { id: 'classic' as const, icon: Target, title: ui(lang, 'classic'), desc: ui(lang, 'classic_desc'), accent: 'var(--emerald-glow)' },
    { id: 'time-attack' as const, icon: Zap, title: ui(lang, 'time_attack'), desc: ui(lang, 'attack_desc'), accent: 'var(--gold)' },
    { id: 'survival' as const, icon: Skull, title: ui(lang, 'survival'), desc: ui(lang, 'survival_desc'), accent: '#ef4444' },
  ];

  const handlePlay = () => {
    router.push(`/quiz/${slug}/play?mode=${activeMode}`);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/categories" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> All quizzes
      </Link>

      {/* Quiz header */}
      <Card className="border-border bg-card/70 backdrop-blur overflow-hidden mb-6" style={{ borderColor: seed.color + '40' }}>
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl text-4xl mb-4" style={{ background: seed.color + '20' }}>{seed.icon}</div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">{description}</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">{category}</Badge>
            <Badge variant="outline" className={`text-xs ${
              seed.difficulty === 'easy' ? 'text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40' :
              seed.difficulty === 'medium' ? 'text-[var(--gold)] border-[var(--gold)]/40' :
              'text-orange-400 border-orange-400/40'
            }`}>{t[`difficulty_${seed.difficulty}`]}</Badge>
            <Badge variant="outline" className="text-xs"><Target className="h-3 w-3 mr-1" />{seed.questions.length} {t.quiz_questions}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Mode selection */}
      <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Select mode</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {modes.map(m => {
          const Icon = m.icon;
          const active = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setLocalMode(m.id)}
              className={`text-left rounded-xl border p-4 transition-all ${active ? 'border-2 bg-accent/30' : 'border-border bg-card/40 hover:border-[var(--emerald-glow)]/40'}`}
              style={active ? { borderColor: m.accent } : {}}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg mb-3" style={{ backgroundColor: `color-mix(in oklch, ${m.accent} 15%, transparent)`, color: m.accent }}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-bold text-sm">{m.title}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Play button */}
      <Button onClick={handlePlay} size="lg" className="w-full h-14 text-base bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-bold">
        <Play className="h-5 w-5 mr-2" />
        {ui(lang, activeMode === 'time-attack' ? 'play_attack' : activeMode === 'survival' ? 'play_survival' : 'play_classic')}
        <ChevronRight className="h-5 w-5 ml-2" />
      </Button>

      {/* Info */}
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <Clock className="h-3 w-3 inline mr-1" />
        {activeMode === 'classic' && '~2-3 min per quiz · Answer fast for bonus XP'}
        {activeMode === 'time-attack' && '60 seconds · Answer as many as you can'}
        {activeMode === 'survival' && 'Until you make a mistake · No second chances'}
      </div>
    </div>
  );
}
