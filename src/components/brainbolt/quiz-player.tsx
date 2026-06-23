'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Clock, Flame, Trophy, Zap, Target, Check, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from './language-context';
import { useSound } from '@/hooks/use-sound';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';

interface PlayerAnswer {
  questionId: string;
  selectedIndex: number;
  timeMs: number;
}

type GameMode = 'classic' | 'time-attack' | 'survival';

export function QuizPlayer({ slug, mode, isDaily = false }: { slug: string; mode: GameMode; isDaily?: boolean }) {
  const router = useRouter();
  const { t, lang } = useLang();
  const { play } = useSound();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeAttackTimeLeft, setTimeAttackTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [slideAnim, setSlideAnim] = useState<'in' | 'out'>('in');
  const [submitting, setSubmitting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const showFeedbackRef = useRef(false);
  const answersRef = useRef<PlayerAnswer[]>([]);

  useEffect(() => {
    const seed = SEED_QUIZZES.find((q) => q.slug === slug);
    if (!seed) { router.push('/categories'); return; }
    setQuiz({
      slug: seed.slug,
      title: getLocalized(seed.title, lang),
      icon: seed.icon,
      color: seed.color,
      questions: seed.questions.map((q, i) => ({
        id: `${seed.slug}-q${i}`,
        text: getLocalized(q.text, lang),
        options: q.options.map((o) => getLocalized(o, lang)),
        timeLimit: q.timeLimit || 15,
        order: i,
      })),
    });
    setTimeLeft(seed.questions[0].timeLimit || 15);
    setLoading(false);
  }, [slug, lang, router]);

  const question = quiz?.questions[currentIdx];
  const isLast = quiz && currentIdx === quiz.questions.length - 1;
  const isTimeAttack = mode === 'time-attack';

  const handleAnswer = useCallback((idx: number, timedOut = false) => {
    if (showFeedbackRef.current || !question) return;
    if (timerRef.current) clearInterval(timerRef.current);
    showFeedbackRef.current = true;
    const timeMs = Date.now() - startTimeRef.current;
    setSelectedIdx(idx);
    setShowFeedback(true);
    const answer: PlayerAnswer = { questionId: question.id, selectedIndex: idx, timeMs: timedOut ? question.timeLimit * 1000 : timeMs };
    answersRef.current = [...answersRef.current, answer];
    setAnswers(answersRef.current);
  }, [question]);

  useEffect(() => {
    if (!quiz || isTimeAttack) return;
    setTimeLeft(question.timeLimit);
    setSelectedIdx(null);
    setShowFeedback(false);
    showFeedbackRef.current = false;
    startTimeRef.current = Date.now();
    setSlideAnim('in');
    timerRef.current = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 4 && s > 1) play('tick');
        if (s <= 1) { if (timerRef.current) clearInterval(timerRef.current); handleAnswer(-1, true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentIdx, question?.timeLimit, isTimeAttack, handleAnswer, play, quiz]);

  useEffect(() => {
    if (!isTimeAttack || !quiz) return;
    startTimeRef.current = Date.now();
    const ta = setInterval(() => {
      setTimeAttackTimeLeft((s) => {
        if (s <= 4 && s > 1) play('tick');
        if (s <= 1) { clearInterval(ta); submitAttempt(answersRef.current); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ta);
  }, [isTimeAttack, quiz]);

  const submitAttempt = useCallback(async (finalAnswers: PlayerAnswer[]) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizSlug: slug, answers: finalAnswers, mode, isDaily }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      sessionStorage.setItem('brainbolt:lastResult', JSON.stringify(data));
      sessionStorage.setItem('brainbolt:lastQuizSlug', slug);
      router.push(`/quiz/${slug}/results`);
    } catch (e) {
      console.error('Submit failed:', e);
      setSubmitting(false);
    }
  }, [slug, mode, isDaily, router, submitting]);

  const handleNext = useCallback(() => {
    if (isLast || isTimeAttack) { submitAttempt(answersRef.current); }
    else { setSlideAnim('out'); setTimeout(() => setCurrentIdx((i) => i + 1), 200); }
  }, [isLast, isTimeAttack, submitAttempt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showFeedback) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleNext(); } return; }
      if (['1', '2', '3', '4'].includes(e.key) && question) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < question.options.length) handleAnswer(idx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFeedback, question, handleAnswer, handleNext]);

  if (loading || !quiz) {
    return <div className="container mx-auto max-w-3xl px-4 py-20 text-center"><div className="animate-pulse text-muted-foreground">Loading quiz...</div></div>;
  }

  const progressPct = ((currentIdx + (showFeedback ? 1 : 0)) / quiz.questions.length) * 100;
  const timePct = (timeLeft / question.timeLimit) * 100;
  const timeColor = timeLeft <= 3 ? '#ef4444' : timeLeft <= 7 ? 'var(--gold)' : 'var(--emerald-glow)';

  return (
    <section className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <button onClick={() => router.push('/categories')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Home className="h-4 w-4" /> Exit
        </button>
        <Badge variant="outline" className={`text-[10px] uppercase tracking-wide ${
          mode === 'time-attack' ? 'text-[var(--gold)] border-[var(--gold)]/40' :
          mode === 'survival' ? 'text-red-400 border-red-400/40' :
          'text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40'
        }`}>
          {mode === 'time-attack' ? '⚡ Time Attack' : mode === 'survival' ? '💀 Survival' : '🎯 Classic'}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{quiz.icon}</span>
          <div>
            <div className="font-bold text-sm">{quiz.title}</div>
            {!isTimeAttack && <div className="text-[10px] text-muted-foreground">{t.player_question} {currentIdx + 1} {t.player_of} {quiz.questions.length}</div>}
            {isTimeAttack && <div className="text-[10px] text-muted-foreground">{answers.length} answered</div>}
          </div>
        </div>
        {streak >= 3 && <Badge className="text-[10px] bg-orange-400 text-black"><Flame className="h-2.5 w-2.5 mr-1" /> {streak} streak</Badge>}
      </div>

      {!isTimeAttack && (
        <div className="h-1.5 bg-background/60 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)] transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {isTimeAttack && (
        <div className="mb-4 p-3 rounded-lg border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-center">
          <div className="text-xs text-[var(--gold)] uppercase tracking-wide mb-1">Time remaining</div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[var(--gold)]">{timeAttackTimeLeft}s</div>
        </div>
      )}

      <Card className={`border-border bg-card/70 backdrop-blur-xl transition-all duration-200 ${slideAnim === 'in' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <CardContent className="pt-6 pb-6">
          {!isTimeAttack && (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-muted-foreground">{t.player_time_left}</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: timeColor }} />
                  <span className="text-2xl font-bold font-mono tabular-nums" style={{ color: timeColor }}>{timeLeft}</span>
                </div>
              </div>
              <div className="h-1 bg-background/60 rounded-full overflow-hidden mb-5">
                <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${timePct}%`, background: timeColor }} />
              </div>
            </>
          )}

          <h2 className="text-xl sm:text-2xl font-bold mb-5 leading-snug">{question.text}</h2>

          <div className="grid gap-2.5">
            {question.options.map((opt: string, i: number) => {
              const isSelected = selectedIdx === i;
              return (
                <button
                  key={i}
                  onClick={() => { if (!showFeedback) { handleAnswer(i); play('click'); } }}
                  disabled={showFeedback}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border text-left transition-all ${
                    showFeedback && isSelected ? 'border-[var(--emerald-glow)] bg-[var(--emerald-glow)]/10 ring-1 ring-[var(--emerald-glow)]/40 scale-[1.02]' :
                    showFeedback ? 'border-border opacity-50' : 'border-border bg-background/40 hover:border-[var(--emerald-glow)]/40 hover:bg-accent/30'
                  }`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                    showFeedback && isSelected ? 'border-[var(--emerald-glow)] bg-[var(--emerald-glow)] text-black' : 'border-border text-muted-foreground'
                  }`}>{String.fromCharCode(65 + i)}</div>
                  <span className="flex-1 text-sm">{opt}</span>
                  {showFeedback && isSelected && <Check className="h-4 w-4 text-[var(--emerald-glow)]" />}
                </button>
              );
            })}
          </div>

          {!showFeedback && (
            <div className="mt-4 text-[10px] text-muted-foreground text-center">
              Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-background/60 font-mono">1</kbd>-<kbd className="px-1.5 py-0.5 rounded border border-border bg-background/60 font-mono">4</kbd> to answer
            </div>
          )}

          {showFeedback && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNext} disabled={submitting} size="lg" className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
                {submitting ? 'Loading...' : isLast || isTimeAttack ? t.player_finish : t.player_next}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
