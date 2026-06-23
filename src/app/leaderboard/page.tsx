'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Crown, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLang } from '@/components/brainbolt/language-context';

export default function LeaderboardPage() {
  const { t } = useLang();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'week'>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/leaderboard').then(r => r.json()),
      fetch('/api/me').then(r => r.json()),
    ]).then(([lb, me]) => {
      setLeaderboard(lb.leaderboard || []);
      setProfile(me.user);
      setLoading(false);
    });
  }, []);

  // For weekly, filter by recent activity (simple approach: same leaderboard, client-side)
  // Real weekly would need server endpoint — using all for now
  const displayed = leaderboard;

  const podium = displayed.slice(0, 3);
  const rest = displayed.slice(3);

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-7 w-7 text-[var(--gold)]" />
        <h1 className="text-3xl font-bold">{t.lb_title}</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{t.lb_sub}</p>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6">
        <button onClick={() => setTab('all')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${tab === 'all' ? 'bg-[var(--emerald-glow)] text-black' : 'border border-border text-muted-foreground'}`}>
          All time
        </button>
        <button onClick={() => setTab('week')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${tab === 'week' ? 'bg-[var(--emerald-glow)] text-black' : 'border border-border text-muted-foreground'}`}>
          This week
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-14 rounded-md bg-card/40 animate-pulse" />)}
        </div>
      ) : displayed.length === 0 ? (
        <Card className="border-border bg-card/60">
          <CardContent className="pt-12 pb-12 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-40 text-muted-foreground" />
            <p className="text-muted-foreground">{t.lb_empty}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Podium */}
          {podium.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 mb-6 items-end">
              <PodiumCard entry={podium[1]} place={2} />
              <PodiumCard entry={podium[0]} place={1} />
              <PodiumCard entry={podium[2]} place={3} />
            </div>
          )}

          {/* Rest of leaderboard */}
          <div className="space-y-1.5">
            {rest.map((entry) => {
              const isMe = profile && entry.id === profile.id;
              return (
                <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-md border ${isMe ? 'border-[var(--emerald-glow)]/40 bg-[var(--emerald-glow)]/10' : 'border-border bg-card/40'}`}>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-background/60 text-muted-foreground">
                    {entry.rank}
                  </div>
                  <span className="text-xl">{entry.avatar || '🎯'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {entry.name} {isMe && <span className="text-[10px] text-[var(--emerald-glow)]">({t.lb_you})</span>}
                    </div>
                    <div className="text-[10px] text-muted-foreground">Lv {entry.level} · {entry.totalQuizzes} {t.lb_quizzes.toLowerCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[var(--gold)]">{entry.xp.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">XP</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function PodiumCard({ entry, place }: { entry: any; place: number }) {
  const colors: Record<number, { bg: string; text: string; icon: any; height: string }> = {
    1: { bg: 'var(--gold)', text: '#000', icon: Crown, height: 'h-32' },
    2: { bg: '#9ca3af', text: '#000', icon: Medal, height: 'h-24' },
    3: { bg: '#fb923c', text: '#000', icon: Medal, height: 'h-20' },
  };
  const c = colors[place];
  const Icon = c.icon;
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl mb-1">{entry.avatar || '🎯'}</div>
      <div className="text-xs font-bold truncate max-w-full">{entry.name}</div>
      <div className={`w-full ${c.height} rounded-t-lg flex flex-col items-center justify-start pt-3`} style={{ background: c.bg, color: c.text }}>
        <Icon className="h-5 w-5 mb-1" />
        <div className="text-xs font-bold">{entry.xp.toLocaleString()}</div>
        <div className="text-[9px] uppercase">XP</div>
      </div>
    </div>
  );
}
