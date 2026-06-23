'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Flame, Trophy, Zap, Target, Shuffle } from 'lucide-react';
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

  const featured = SEED_QUIZZES.slice(0, 6);
  const randomQuiz = SEED_QUIZZES[Math.floor(Math.random() * SEED_QUIZZES.length)];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      {/* Hero */}
      <div className="mb-8 animate-slide-in-up">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-3">
          Train your brain.
          <br />
          <span className="text-primary">Beat the board.</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg">{t.hero_sub}</p>
      </div>

      {/* Main CTA — big, with glow */}
      <Link
        href="/categories"
        onClick={() => trigger('select')}
        className="block mb-6 group"
      >
        <div className="relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-primary text-primary-foreground press shadow-glow overflow-hidden">
          <div className="relative z-10">
            <div className="text-xl sm:text-2xl font-bold">{t.hero_cta_primary}</div>
            <div className="text-xs opacity-80 mt-0.5">30 quizzes · 300 questions · 3 modes</div>
          </div>
          <ArrowRight className="h-7 w-7 relative z-10 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      {/* Secondary actions */}
      <div className="flex gap-2 mb-8">
        <Link href={`/quiz/${randomQuiz.slug}`} onClick={() => trigger('tap')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-card border border-border press text-sm font-medium hover:border-primary/30 transition-colors">
          <Shuffle className="h-4 w-4" /> Random
        </Link>
        <Link href="/leaderboard" onClick={() => trigger('tap')} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-card border border-border press text-sm font-medium hover:border-primary/30 transition-colors">
          <Trophy className="h-4 w-4" /> Ranks
        </Link>
      </div>

      {/* Stats bar — premium grid */}
      {profile && profile.totalQuizzes > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-8 animate-slide-in-up">
          <StatCard icon={Trophy} value={profile.level} label="Level" accent="primary" />
          <StatCard icon={Target} value={profile.totalQuizzes} label="Played" accent="foreground" />
          <StatCard icon={Flame} value={profile.bestStreak} label="Streak" accent="gold" />
          <StatCard icon={Zap} value={profile.xp.toLocaleString()} label="XP" accent="primary" />
        </div>
      )}

      {/* Daily challenge — premium card */}
      {daily && (
        <Link
          href={`/quiz/${daily.slug}?mode=classic&daily=1`}
          onClick={() => trigger('select')}
          className="block mb-8 group"
        >
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border lift shadow-card hover:border-primary/30">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl shrink-0" style={{ background: daily.color + '15' }}>
              {daily.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-primary font-bold mb-1">
                <Calendar className="h-3 w-3" /> Daily Challenge
              </div>
              <div className="font-bold text-base truncate">{daily.title}</div>
              <div className="text-xs text-muted-foreground truncate">{daily.description}</div>
            </div>
            {profile?.dailyStreak > 0 && (
              <div className="flex flex-col items-center shrink-0">
                <span className="text-lg font-bold text-primary">🔥{profile.dailyStreak}</span>
                <span className="text-[9px] text-muted-foreground uppercase">days</span>
              </div>
            )}
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </Link>
      )}

      {/* Popular quizzes — card grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Popular</h2>
          <Link href="/categories" onClick={() => trigger('tap')} className="text-xs text-primary hover:underline">All {SEED_QUIZZES.length} →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 stagger">
          {featured.map((q) => (
            <Link
              key={q.slug}
              href={`/quiz/${q.slug}`}
              onClick={() => trigger('select')}
              className="block p-3.5 rounded-xl bg-card border border-border lift press hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{q.icon}</span>
                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  q.difficulty === 'easy' ? 'bg-primary/10 text-primary' :
                  q.difficulty === 'medium' ? 'bg-gold/10 text-gold' :
                  'bg-destructive/10 text-destructive'
                }`}>{q.difficulty}</span>
              </div>
              <div className="font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors">{getLocalized(q.title, lang)}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{q.questions.length} questions</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, accent }: any) {
  const colors: Record<string, string> = {
    primary: 'text-primary',
    foreground: 'text-foreground',
    gold: 'text-gold',
  };
  return (
    <div className="flex flex-col items-center p-3 rounded-xl bg-card border border-border">
      <Icon className={`h-4 w-4 mb-1 ${colors[accent]}`} />
      <div className={`text-lg font-bold ${colors[accent]}`}>{value}</div>
      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
