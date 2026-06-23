'use client';
import { ui } from '@/lib/ui-strings';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Award, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/components/brainbolt/language-context';
import { ACHIEVEMENTS } from '@/lib/auth';

export default function AchievementsPage() {
  const { t } = useLang();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => setProfile(d.user));
  }, []);

  if (!profile) {
    return <div className="container mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading...</div>;
  }

  const stats = {
    totalQuizzes: profile.totalQuizzes,
    bestStreak: profile.bestStreak,
    perfectScores: 0,
    dailyStreak: profile.dailyStreak,
    xp: profile.xp,
    totalCorrect: profile.totalCorrect,
    level: profile.level,
    categoriesPlayed: 0,
    languagesUsed: 1,
  };

  const unlocked = ACHIEVEMENTS.filter(a => a.check(stats));
  const locked = ACHIEVEMENTS.filter(a => !a.check(stats));

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <Award className="h-7 w-7 text-[var(--emerald-glow)]" />
        <h1 className="text-3xl font-bold">Achievements</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        {unlocked.length} of {ACHIEVEMENTS.length} unlocked
      </p>
      <div className="h-2 bg-background/60 rounded-full overflow-hidden mb-8 max-w-md">
        <div className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)]" style={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }} />
      </div>

      {/* Unlocked */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{ui(lang, 'unlocked')} ({unlocked.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {unlocked.map(a => (
          <Card key={a.id} className="border-[var(--emerald-glow)]/30 bg-[var(--emerald-glow)]/5">
            <CardContent className="pt-5 pb-5 text-center">
              <div className="text-4xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.title}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{a.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Locked */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{ui(lang, 'locked')} ({locked.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {locked.map(a => (
          <Card key={a.id} className="border-border bg-card/40 opacity-60">
            <CardContent className="pt-5 pb-5 text-center">
              <div className="text-4xl mb-2 grayscale">{a.icon}</div>
              <div className="font-bold text-sm">{a.title}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{a.desc}</div>
              <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-muted-foreground">
                <Lock className="h-2.5 w-2.5" /> Locked
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
