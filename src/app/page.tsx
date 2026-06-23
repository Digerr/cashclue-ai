'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Sparkles, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/components/brainbolt/language-context';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function HomePage() {
  const { t, lang } = useLang();
  const [daily, setDaily] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/daily?lang=${lang}`).then(r => r.json()).then(d => setDaily(d.daily));
    fetch('/api/me').then(r => r.json()).then(d => setProfile(d.user));
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'page_view' }) }).catch(() => {});
  }, [lang]);

  const featured = SEED_QUIZZES.slice(0, 6);
  const randomQuiz = SEED_QUIZZES[Math.floor(Math.random() * SEED_QUIZZES.length)];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* Hero — minimal */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {t.hero_title_1} <span className="text-[var(--emerald-glow)]">{t.hero_title_2}</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">{t.hero_sub}</p>
      </div>

      {/* Main CTA — ONE big button */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <Button asChild size="lg" className="h-14 px-10 text-lg bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-bold">
          <Link href="/categories" className="flex items-center gap-2">
            {t.hero_cta_primary} <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/leaderboard">{t.hero_cta_secondary}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href={`/quiz/${randomQuiz.slug}`}><Shuffle className="h-3.5 w-3.5 mr-1" />Random</Link>
          </Button>
        </div>
      </div>

      {/* Daily challenge — simple card */}
      {daily && (
        <Link href={`/quiz/${daily.slug}?mode=classic&daily=1`} className="block mb-8 group">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 hover:bg-[var(--gold)]/10 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl shrink-0" style={{ background: daily.color + '20' }}>{daily.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--gold)] font-semibold mb-0.5">
                <Calendar className="h-3 w-3" /> {t.daily_title}
              </div>
              <div className="font-bold text-sm truncate">{daily.title}</div>
            </div>
            {profile?.dailyStreak > 0 && (
              <span className="text-xs text-[var(--gold)] font-bold shrink-0">🔥 {profile.dailyStreak}</span>
            )}
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </div>
        </Link>
      )}

      {/* Featured — simple grid, no cards */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Popular</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {featured.map((q) => (
            <Link
              key={q.slug}
              href={`/quiz/${q.slug}`}
              className="flex items-center gap-2.5 p-3 rounded-lg border border-border hover:border-[var(--emerald-glow)]/40 hover:bg-accent/30 transition-all group"
            >
              <span className="text-xl shrink-0">{q.icon}</span>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate group-hover:text-[var(--emerald-glow)] transition-colors">{getLocalized(q.title, lang)}</div>
                <div className="text-[10px] text-muted-foreground">{q.questions.length} Q</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats — only if played */}
      {profile && profile.totalQuizzes > 0 && (
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-xl font-bold text-[var(--emerald-glow)]">{profile.level}</div>
            <div className="text-[10px] text-muted-foreground uppercase">{t.profile_level}</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{profile.totalQuizzes}</div>
            <div className="text-[10px] text-muted-foreground uppercase">Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-400">{profile.bestStreak}</div>
            <div className="text-[10px] text-muted-foreground uppercase">Best streak</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[var(--gold)]">{profile.xp.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground uppercase">XP</div>
          </div>
        </div>
      )}
    </div>
  );
}
