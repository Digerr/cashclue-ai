'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Flame, Trophy, Zap, Target, Skull, Sparkles, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

  // Quiz of the week (deterministic by week)
  const now = new Date();
  const weekOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (7 * 24 * 60 * 60 * 1000));
  const weeklyQuiz = SEED_QUIZZES[weekOfYear % SEED_QUIZZES.length];

  const featured = SEED_QUIZZES.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[var(--emerald-glow)]/20 blur-[120px] pointer-events-none" />
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6 float-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--emerald-glow)] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--emerald-glow)]" />
              </span>
              {t.hero_badge}
            </div>
            <h1 className="float-up text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              {t.hero_title_1} <br className="hidden sm:block" />
              <span className="shimmer-text">{t.hero_title_2}</span>
            </h1>
            <p className="float-up mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.hero_sub}</p>
            <div className="float-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold text-base h-12 px-8 pulse-glow">
                <Link href="/categories" className="flex items-center gap-2">{t.hero_cta_primary} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold text-base h-12 px-8 border-border bg-card/40 backdrop-blur">
                <Link href="/leaderboard">{t.hero_cta_secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
        {/* Daily + Weekly */}
        <div className="grid md:grid-cols-2 gap-4">
          {daily && (
            <Card className="border-[var(--gold)]/40 bg-gradient-to-br from-[var(--gold)]/10 to-transparent">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-[var(--gold)]" />
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">{t.daily_title}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: daily.color + '20' }}>{daily.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{daily.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{daily.description}</p>
                  </div>
                </div>
                <Button asChild size="sm" className="bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 font-semibold w-full">
                  <Link href={`/quiz/${daily.slug}?mode=classic&daily=1`}>{t.daily_play}</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="border-purple-400/40 bg-gradient-to-br from-purple-400/10 to-transparent">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Quiz of the Week</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ background: weeklyQuiz.color + '20' }}>{weeklyQuiz.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{getLocalized(weeklyQuiz.title, lang)}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{getLocalized(weeklyQuiz.description, lang)}</p>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="font-semibold w-full border-purple-400/40 text-purple-400 hover:bg-purple-400/10">
                <Link href={`/quiz/${weeklyQuiz.slug}`}>Play weekly</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User stats */}
        {profile && profile.totalQuizzes > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MiniStat icon={Trophy} label={t.profile_level} value={`${profile.level}`} accent="var(--emerald-glow)" />
            <MiniStat icon={Zap} label={t.profile_xp} value={profile.xp.toLocaleString()} accent="var(--gold)" />
            <MiniStat icon={Target} label={t.profile_total_quizzes} value={`${profile.totalQuizzes}`} accent="#60a5fa" />
            <MiniStat icon={Flame} label={t.profile_best_streak} value={`${profile.bestStreak}`} accent="#fb923c" />
          </div>
        )}

        {/* Game modes */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> Game modes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ModeCard icon={Target} title="Classic" desc="10 questions, 15s each" accent="var(--emerald-glow)" href="/categories" />
            <ModeCard icon={Zap} title="Time Attack" desc="60s, max correct answers" accent="var(--gold)" href="/categories?mode=time-attack" />
            <ModeCard icon={Skull} title="Survival" desc="1 wrong = game over" accent="#ef4444" href="/categories?mode=survival" />
          </div>
        </div>

        {/* Featured quizzes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">Featured quizzes</h2>
            <Link href="/categories" className="text-sm text-[var(--emerald-glow)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((q) => (
              <QuizCardMini key={q.slug} quiz={q} lang={lang} />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 justify-center pt-4">
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/categories"><Shuffle className="h-4 w-4 mr-2" />Random quiz</Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/leaderboard"><Trophy className="h-4 w-4 mr-2" />Leaderboard</Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/profile"><Target className="h-4 w-4 mr-2" />Profile</Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/achievements"><Sparkles className="h-4 w-4 mr-2" />Achievements</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function MiniStat({ icon: Icon, label, value, accent }: any) {
  return (
    <Card className="border-border bg-card/60 backdrop-blur">
      <CardContent className="pt-3 pb-3 px-4">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-0.5">
          <Icon className="h-3 w-3" style={{ color: accent }} />{label}
        </div>
        <div className="text-lg font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ModeCard({ icon: Icon, title, desc, accent, href }: any) {
  return (
    <Link href={href} className="text-left rounded-xl border border-border bg-card/50 backdrop-blur p-4 transition-all hover:border-[var(--emerald-glow)]/40 hover:-translate-y-0.5 block">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg mb-3" style={{ backgroundColor: `color-mix(in oklch, ${accent} 15%, transparent)`, color: accent }}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
    </Link>
  );
}

function QuizCardMini({ quiz, lang }: { quiz: any; lang: any }) {
  return (
    <Link href={`/quiz/${quiz.slug}`}>
      <Card className="group border-border bg-card/60 backdrop-blur overflow-hidden transition-all hover:border-[var(--emerald-glow)]/40 hover:-translate-y-0.5 h-full">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: quiz.color + '20' }}>{quiz.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold leading-tight truncate">{getLocalized(quiz.title, lang)}</h3>
              <Badge variant="outline" className="text-[10px] py-0 h-4 mt-1">{getLocalized(quiz.category, lang)}</Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{getLocalized(quiz.description, lang)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
