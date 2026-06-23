'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLang } from '@/components/brainbolt/language-context';
import { useFeedback } from '@/hooks/use-feedback';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function HomePage() {
  const { t, lang } = useLang();
  const { trigger } = useFeedback();
  const [daily, setDaily] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/daily?lang=${lang}`).then(r => r.json()).then(d => setDaily(d.daily));
    fetch('/api/me').then(r => r.json()).then(d => setProfile(d.user));
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'page_view' }) }).catch(() => {});
  }, [lang]);

  const featured = SEED_QUIZZES.slice(0, 8);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Hero — bold, minimal */}
      <div className="mb-10 animate-slide-up">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-3">
          Train your brain.
          <br />
          <span className="text-primary">Beat the board.</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">{t.hero_sub}</p>
      </div>

      {/* Main CTA */}
      <Link
        href="/categories"
        onClick={() => trigger('select')}
        className="block w-full mb-8 group"
      >
        <div className="flex items-center justify-between p-5 bg-primary text-primary-foreground press rounded-lg">
          <div>
            <div className="text-xl font-bold">{t.hero_cta_primary}</div>
            <div className="text-xs opacity-80">30 quizzes · 300 questions</div>
          </div>
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Daily challenge */}
      {daily && (
        <Link
          href={`/quiz/${daily.slug}?mode=classic&daily=1`}
          onClick={() => trigger('tap')}
          className="block mb-8 group"
        >
          <div className="flex items-center gap-3 p-4 border border-border rounded-lg press hover:border-primary/40 transition-colors">
            <div className="text-2xl">{daily.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-primary font-bold mb-0.5">
                <Calendar className="h-3 w-3" /> {t.daily_title}
              </div>
              <div className="font-bold text-sm truncate">{daily.title}</div>
            </div>
            {profile?.dailyStreak > 0 && (
              <span className="text-xs font-mono font-bold text-primary shrink-0">🔥{profile.dailyStreak}</span>
            )}
          </div>
        </Link>
      )}

      {/* Quick stats — only after first play */}
      {profile && profile.totalQuizzes > 0 && (
        <div className="grid grid-cols-4 gap-px bg-border mb-8 rounded-lg overflow-hidden">
          <div className="bg-card p-3 text-center">
            <div className="text-xl font-bold font-mono text-primary">{profile.level}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Level</div>
          </div>
          <div className="bg-card p-3 text-center">
            <div className="text-xl font-bold font-mono">{profile.totalQuizzes}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Played</div>
          </div>
          <div className="bg-card p-3 text-center">
            <div className="text-xl font-bold font-mono">{profile.bestStreak}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Streak</div>
          </div>
          <div className="bg-card p-3 text-center">
            <div className="text-xl font-bold font-mono text-primary">{profile.xp}</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">XP</div>
          </div>
        </div>
      )}

      {/* Popular quizzes — simple list, not grid */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-3">Popular</div>
        <div className="space-y-px stagger">
          {featured.map((q) => (
            <Link
              key={q.slug}
              href={`/quiz/${q.slug}`}
              onClick={() => trigger('tap')}
              className="flex items-center gap-3 p-3 bg-card hover:bg-accent rounded press transition-colors group"
            >
              <span className="text-xl shrink-0">{q.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{getLocalized(q.title, lang)}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{q.questions.length}Q · {q.difficulty}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom links */}
      <div className="flex gap-4 justify-center mt-8 text-xs text-muted-foreground">
        <Link href="/leaderboard" onClick={() => trigger('tap')} className="hover:text-foreground press">🏆 Leaderboard</Link>
        <Link href="/achievements" onClick={() => trigger('tap')} className="hover:text-foreground press">🎖 Awards</Link>
        <Link href="/profile" onClick={() => trigger('tap')} className="hover:text-foreground press">👤 Profile</Link>
      </div>
    </div>
  );
}
