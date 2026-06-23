'use client';
import { ui } from '@/lib/ui-strings';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Zap, Target, Flame, Award, Edit2, Save, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLang } from '@/components/brainbolt/language-context';
import { ACHIEVEMENTS, getRank, getNextRank } from '@/lib/auth';

export default function ProfilePage() {
  const { t } = useLang();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🎯');

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => {
      setProfile(d.user);
      setName(d.user?.name || '');
      setAvatar(d.user?.avatar || '🎯');
    });
    fetch('/api/stats').then(r => r.json()).then(d => setStats(d)).catch(() => {});
  }, []);

  const save = async () => {
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, avatar }),
    });
    const d = await res.json();
    if (d.user) {
      setProfile({ ...profile, ...d.user });
      setEditing(false);
    }
  };

  if (!profile) {
    return <div className="container mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">Loading...</div>;
  }

  const achStats = {
    totalQuizzes: profile.totalQuizzes,
    bestStreak: profile.bestStreak,
    perfectScores: 0,
    dailyStreak: profile.dailyStreak,
    xp: profile.xp,
    totalCorrect: profile.totalCorrect,
    level: profile.level,
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <Card className="border-border bg-card/70 backdrop-blur mb-6">
        <CardContent className="pt-6 pb-6">
          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">{t.profile_name}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1" maxLength={30} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">{t.profile_avatar}</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {['🎯', '🧠', '⚡', '🔥', '🏆', '👑', '🚀', '💪', '🦉', '🌟', '💎', '🎭'].map(e => (
                    <button key={e} onClick={() => setAvatar(e)} className={`text-2xl h-10 w-10 rounded-md border ${avatar === e ? 'border-[var(--emerald-glow)] bg-[var(--emerald-glow)]/10' : 'border-border'}`}>{e}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={save} className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold"><Save className="h-4 w-4 mr-2" />{t.profile_save}</Button>
                <Button onClick={() => setEditing(false)} variant="outline">Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--emerald-glow)]/15 text-3xl">{profile.avatar || '🎯'}</div>
              <div className="flex-1">
                <div className="text-xl font-bold">{profile.name || `Player ${profile.id.slice(-4)}`}</div>
                <div className="text-sm text-muted-foreground">{t.profile_level} {profile.level} · {profile.xp.toLocaleString()} XP</div>
              </div>
              <Button onClick={() => setEditing(true)} variant="outline" size="sm"><Edit2 className="h-4 w-4 mr-1" />{t.profile_edit}</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level progress + Rank */}
      <Card className="border-border bg-card/70 backdrop-blur mb-6">
        <CardContent className="pt-5 pb-5">
          {/* Rank badge */}
          {(() => {
            const rank = getRank(profile.level);
            const next = getNextRank(profile.level);
            return (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{rank.icon}</span>
                  <div>
                    <div className="font-bold text-sm" style={{ color: rank.color }}>{rank.name}</div>
                    <div className="text-[10px] text-muted-foreground">Level {profile.level}</div>
                  </div>
                </div>
                {next && (
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground">{ui(lang, 'next_rank')}: {next.icon} {next.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{ui(lang, 'at_level')} {next.minLevel}</div>
                  </div>
                )}
              </div>
            );
          })()}
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">{profile.xp.toLocaleString()} XP total</span>
            <span className="font-semibold">{profile.xpToNext} XP to next level</span>
          </div>
          <div className="h-3 bg-background/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)]" style={{ width: `${profile.levelProgress * 100}%` }} />
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <StatCard icon={Trophy} label={t.profile_level} value={profile.level} accent="var(--emerald-glow)" />
        <StatCard icon={Zap} label={t.profile_xp} value={profile.xp.toLocaleString()} accent="var(--gold)" />
        <StatCard icon={Target} label={t.profile_total_quizzes} value={profile.totalQuizzes} accent="#60a5fa" />
        <StatCard icon={Check2} label={t.profile_total_correct} value={profile.totalCorrect} accent="var(--emerald-glow)" />
        <StatCard icon={Flame} label={t.profile_best_streak} value={profile.bestStreak} accent="#fb923c" />
        <StatCard icon={Award} label={t.profile_daily_streak} value={profile.dailyStreak} accent="var(--gold)" />
      </div>

      {/* Category stats */}
      {stats && stats.categories && stats.categories.length > 0 && (
        <Card className="border-border bg-card/70 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Category Stats
              <Badge variant="outline" className="ml-auto text-[10px]">{stats.overallAccuracy}% accuracy</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {stats.categories.slice(0, 8).map((cat: any) => (
              <div key={cat.category} className="flex items-center gap-3">
                <span className="text-xs font-medium w-24 truncate">{cat.category}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cat.accuracy >= 70 ? 'bg-primary' :
                      cat.accuracy >= 40 ? 'bg-gold' : 'bg-destructive'
                    }`}
                    style={{ width: `${cat.accuracy}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-bold w-8 text-right ${
                  cat.accuracy >= 70 ? 'text-primary' :
                  cat.accuracy >= 40 ? 'text-gold' : 'text-destructive'
                }`}>{cat.accuracy}%</span>
                <span className="text-[10px] text-muted-foreground w-12 text-right font-mono">{cat.played}x</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Achievements preview */}
      <Card className="border-border bg-card/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-[var(--emerald-glow)]" />
            {t.profile_achievements}
            <Badge variant="outline" className="ml-auto">
              {ACHIEVEMENTS.filter(a => a.check(stats)).length} / {ACHIEVEMENTS.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ACHIEVEMENTS.map(a => {
              const unlocked = a.check(stats);
              return (
                <div key={a.id} title={`${a.title} — ${a.desc}`} className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all ${unlocked ? 'bg-[var(--emerald-glow)]/15' : 'bg-background/40 opacity-40 grayscale'}`}>
                  {a.icon}
                </div>
              );
            })}
          </div>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/achievements">View all →</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Check2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}

function StatCard({ icon: Icon, label, value, accent }: any) {
  return (
    <Card className="border-border bg-card/60 backdrop-blur">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
          <Icon className="h-3.5 w-3.5" style={{ color: accent }} />{label}
        </div>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
