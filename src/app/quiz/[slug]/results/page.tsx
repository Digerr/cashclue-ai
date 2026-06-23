'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Check, X, Flame, Clock, Share2, RefreshCw, ChevronRight, Trophy, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/components/brainbolt/language-context';
import { useCountUp } from '@/hooks/use-count-up';
import { useSound } from '@/hooks/use-sound';
import { Confetti } from '@/components/brainbolt/confetti';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

export default function ResultsPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { t, lang } = useLang();
  const { play } = useSound();
  const [result, setResult] = useState<any>(null);
  const animatedScore = useCountUp(result?.score || 0, 1500, 300);
  const [showReview, setShowReview] = useState(false);

  const slug = params.slug;
  const seed = SEED_QUIZZES.find(q => q.slug === slug);

  useEffect(() => {
    const stored = sessionStorage.getItem('brainbolt:lastResult');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(parsed);
      if (parsed.perfect) play('complete');
      else if (parsed.bonus?.leveledUp) play('levelup');
    } catch {}
  }, [play]);

  if (!result || !seed) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">No result found</p>
        <Button asChild><Link href="/categories">Browse quizzes</Link></Button>
      </div>
    );
  }

  const quizTitle = getLocalized(seed.title, lang);
  const pct = (result.correctCount / result.totalCount) * 100;
  const message = result.perfect ? t.results_perfect : pct >= 70 ? t.results_great : pct >= 40 ? t.results_good : t.results_keep_trying;
  const messageColor = result.perfect ? 'var(--gold)' : pct >= 70 ? 'var(--emerald-glow)' : pct >= 40 ? '#60a5fa' : '#fb923c';

  const handleShare = async () => {
    const text = t.results_share_text.replace('{score}', String(result.score));
    try {
      if (navigator.share) await navigator.share({ title: 'BrainBolt result', text, url: window.location.href });
      else { await navigator.clipboard.writeText(`${text}\n\n${window.location.href}`); alert('Copied!'); }
    } catch {}
  };

  const loc = (field: any) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.en;
  };

  return (
    <>
      <Confetti trigger={result.perfect} />
      <section className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-[var(--emerald-glow)]/40 bg-gradient-to-br from-[var(--emerald-glow)]/10 to-transparent overflow-hidden mb-4">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-5xl mb-3">{result.perfect ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '💪'}</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: messageColor }}>{message}</h1>
            <p className="text-sm text-muted-foreground mb-6">{quizTitle}</p>
            <div className="inline-flex flex-col items-center">
              <div className="text-6xl sm:text-7xl font-bold font-mono tabular-nums animate-pop" style={{ color: messageColor }}>{animatedScore}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{t.results_xp_earned}</div>
            </div>

            {result.bonus && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {result.bonus.firstQuizBonus && <Badge className="bg-[var(--gold)] text-black text-[10px]"><Star className="h-2.5 w-2.5 mr-1" /> First quiz x2!</Badge>}
                {result.bonus.difficultyMultiplier > 1 && <Badge variant="outline" className="text-[10px] text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40"><Zap className="h-2.5 w-2.5 mr-1" /> {result.bonus.difficultyMultiplier}x difficulty</Badge>}
                {result.bonus.leveledUp && <Badge className="bg-purple-500 text-white text-[10px]"><Trophy className="h-2.5 w-2.5 mr-1" /> Level {result.bonus.newLevel}!</Badge>}
              </div>
            )}

            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{t.results_correct}</span>
                <span>{result.correctCount} / {result.totalCount} ({Math.round(pct)}%)</span>
              </div>
              <div className="h-2 bg-background/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)] transition-all duration-1000" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <MiniStat icon={Check} label={t.results_correct} value={`${result.correctCount}/${result.totalCount}`} accent="var(--emerald-glow)" />
          <MiniStat icon={Flame} label={t.results_max_streak} value={`${result.maxStreak}`} accent="#fb923c" />
          <MiniStat icon={Clock} label={t.results_time} value={`${Math.round(result.timeMs / 1000)}s`} accent="var(--gold)" />
        </div>

        {result.userStats && (
          <Card className="border-border bg-card/70 backdrop-blur mb-4">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[var(--gold)]" />
                  <span className="font-semibold">{t.profile_level} {result.userStats.level}</span>
                </div>
                <Badge variant="outline" className="font-mono text-[var(--gold)]"><Zap className="h-3 w-3 mr-1" /> {result.userStats.xp.toLocaleString()} XP</Badge>
              </div>
              <div className="h-2 bg-background/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)]" style={{ width: `${result.userStats.levelProgress * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          <Button onClick={handleShare} variant="outline" className="font-semibold"><Share2 className="h-4 w-4 mr-2" />{t.results_share}</Button>
          <Button onClick={() => setShowReview(v => !v)} variant="outline" className="font-semibold">{t.results_review_answers}</Button>
          <Button asChild className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
            <Link href={`/quiz/${slug}/play?mode=${result.mode || 'classic'}`}><RefreshCw className="h-4 w-4 mr-2" />{t.results_play_again}</Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold"><Link href="/categories">{t.results_try_another}</Link></Button>
        </div>

        {showReview && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-2">{t.results_review_answers}</h3>
            {result.answers.map((a: any, i: number) => (
              <Card key={i} className={`border-border bg-card/60 backdrop-blur ${a.isCorrect ? 'border-l-[var(--emerald-glow)]' : 'border-l-red-400'} border-l-4`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background/60 text-xs font-bold mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-2">{loc(a.text)}</p>
                      <div className="space-y-1 text-xs">
                        <div className={`flex items-center gap-1.5 ${a.isCorrect ? 'text-[var(--emerald-glow)]' : 'text-red-400'}`}>
                          {a.isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                          <span>{t.results_your_answer}: <strong>{a.selectedIndex >= 0 ? loc(a.options[a.selectedIndex]) : '—'}</strong></span>
                        </div>
                        {!a.isCorrect && (
                          <div className="flex items-center gap-1.5 text-[var(--emerald-glow)]">
                            <Check className="h-3.5 w-3.5" />
                            <span>{t.results_correct_answer}: <strong>{loc(a.options[a.correctIndex])}</strong></span>
                          </div>
                        )}
                      </div>
                      {a.explanation && <p className="text-xs text-muted-foreground mt-2 italic">{loc(a.explanation)}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
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
