'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Flame, Check, X, Home } from 'lucide-react';
import { useFeedback } from '@/hooks/use-feedback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from './language-context';
import { useSound } from '@/hooks/use-sound';
import { SEED_QUIZZES, getLocalized } from '@/lib/quiz-data';
import { ui } from '@/lib/ui-strings';

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
  const { trigger } = useFeedback();

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<PlayerAnswer[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timeAttackTimeLeft, setTimeAttackTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [showHintButton, setShowHintButton] = useState(true);
  const [slideAnim, setSlideAnim] = useState<'in' | 'out'>('in');
  const [submitting, setSubmitting] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const showFeedbackRef = useRef(false);
  const answersRef = useRef<PlayerAnswer[]>([]);

  useEffect(() => {
    const seed = SEED_QUIZZES.find((q) => q.slug === slug);
    if (!seed) { router.push('/categories'); return; }

    // Fetch user level for difficulty adaptation
    fetch('/api/me').then(r => r.json()).then(userData => {
      const userLevel = userData.user?.level || 1;

      // Difficulty adaptation:
      // Level 1-3: normal questions, normal time (15s)
      // Level 4-7: shuffle options, slightly less time (13s)
      // Level 8+: shuffle options + shuffle questions, less time (10s)
      const adaptTime = userLevel >= 8 ? 10 : userLevel >= 4 ? 13 : 15;
      const shouldShuffleOptions = userLevel >= 4;
      const shouldShuffleQuestions = userLevel >= 8;

      // Prepare questions
      let questions = seed.questions.map((q, i) => {
        let options = q.options.map(o => getLocalized(o, lang));
        let correctIdx = q.correctIndex;

        // Shuffle options for higher levels
        if (shouldShuffleOptions) {
          const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
          const newOptions = indices.map(idx => getLocalized(q.options[idx], lang));
          correctIdx = indices.indexOf(q.correctIndex);
          options = newOptions;
        }

        return {
          id: `${seed.slug}-q${i}`,
          text: getLocalized(q.text, lang),
          options,
          correctIndex: correctIdx,
          timeLimit: adaptTime,
          order: i,
        };
      });

      // Shuffle question order for level 8+
      if (shouldShuffleQuestions) {
        questions = questions.sort(() => Math.random() - 0.5);
      }

      setQuiz({
        slug: seed.slug,
        title: getLocalized(seed.title, lang),
        icon: seed.icon,
        color: seed.color,
        questions,
        adaptedLevel: userLevel,
      });
      setTimeLeft(questions[0].timeLimit);
      setLoading(false);
    }).catch(() => {
      // Fallback: no adaptation
      const questions = seed.questions.map((q, i) => ({
        id: `${seed.slug}-q${i}`,
        text: getLocalized(q.text, lang),
        options: q.options.map(o => getLocalized(o, lang)),
        correctIndex: q.correctIndex,
        timeLimit: 15,
        order: i,
      }));
      setQuiz({
        slug: seed.slug,
        title: getLocalized(seed.title, lang),
        icon: seed.icon,
        color: seed.color,
        questions,
        adaptedLevel: 1,
      });
      setTimeLeft(15);
      setLoading(false);
    });
  }, [slug, lang, router]);

  const question = quiz?.questions[currentIdx];
  const isLast = quiz && currentIdx === quiz.questions.length - 1;
  const isTimeAttack = mode === 'time-attack';

  // Hint: 50/50 — eliminate 2 wrong options
  const useHint = useCallback(() => {
    if (hintsLeft <= 0 || showFeedback || !question) return;
    trigger('tap');
    setHintsLeft(h => h - 1);
    setHintUsed(true);
    setShowHintButton(false);
    // Eliminate 2 random wrong options
    const wrong = [0, 1, 2, 3].filter(i => i !== question.correctIndex);
    const toEliminate = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminatedOptions(toEliminate);
  }, [hintsLeft, showFeedback, question, trigger]);

  const handleAnswer = useCallback((idx: number, timedOut = false) => {
    if (showFeedbackRef.current || !question) return;
    if (timerRef.current) clearInterval(timerRef.current);
    showFeedbackRef.current = true;
    const timeMs = Date.now() - startTimeRef.current;
    setSelectedIdx(idx);
    setCorrectIdx(question.correctIndex);
    setShowFeedback(true);

    // Haptic + sound based on correctness
    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      trigger('success');
      play('correct');
      setStreak(s => s + 1);
    } else {
      trigger('error');
      play('wrong');
      setStreak(0);
    }

    const answer: PlayerAnswer = { questionId: question.id, selectedIndex: idx, timeMs: timedOut ? question.timeLimit * 1000 : timeMs };
    answersRef.current = [...answersRef.current, answer];
    setAnswers(answersRef.current);

    // Show "Next" button after 1.2s delay (let user see the feedback)
    setTimeout(() => setShowNext(true), 1200);
  }, [question, trigger, play]);

  useEffect(() => {
    if (!quiz || isTimeAttack) return;
    setTimeLeft(question.timeLimit);
    setSelectedIdx(null);
    setCorrectIdx(null);
    setShowFeedback(false);
    setShowNext(false);
    setHintUsed(false);
    setEliminatedOptions([]);
    setShowHintButton(true);
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
      if (showFeedback) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (showNext) handleNext(); } return; }
      if (['1', '2', '3', '4'].includes(e.key) && question) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < question.options.length) handleAnswer(idx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showFeedback, showNext, question, handleAnswer, handleNext]);

  if (loading || !quiz) {
    return <div className="mx-auto max-w-xl px-4 py-20 text-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;
  }

  const progressPct = ((currentIdx + (showFeedback ? 1 : 0)) / quiz.questions.length) * 100;
  const timePct = (timeLeft / question.timeLimit) * 100;
  const timeColor = timeLeft <= 3 ? '#ef4444' : timeLeft <= 7 ? 'var(--gold)' : 'var(--emerald-glow)';

  return (
    <section className="mx-auto max-w-xl px-4 py-2 flex flex-col" style={{ minHeight: 'calc(100vh - 48px)', maxHeight: 'calc(100vh - 48px)', overflow: 'hidden' }}>
      {/* Top bar — ultra compact */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <button onClick={() => router.push('/categories')} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground press">
          <Home className="h-3.5 w-3.5" /> {ui(lang, 'exit')}
        </button>
        {/* Quiz title in header */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{quiz.icon}</span>
          <span className="text-xs font-bold truncate max-w-[100px]">{quiz.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {streak >= 2 && <Badge className="text-[9px] bg-orange-500/20 text-orange-400 border-orange-500/30"><Flame className="h-2.5 w-2.5 mr-0.5" />{streak}</Badge>}
          <Badge variant="outline" className={`text-[9px] uppercase ${
            mode === 'time-attack' ? 'text-gold border-gold/30' :
            mode === 'survival' ? 'text-red-400 border-red-400/30' :
            'text-primary border-primary/30'
          }`}>
            {mode === 'time-attack' ? '⚡ Attack' : mode === 'survival' ? '💀 Survival' : '🎯'}
            {quiz.adaptedLevel >= 8 && <span className="ml-1 text-red-400">🔥HARD</span>}
            {quiz.adaptedLevel >= 4 && quiz.adaptedLevel < 8 && <span className="ml-1 text-gold">⚡MED</span>}
          </Badge>
        </div>
      </div>

      {/* Progress + timer — compact */}
      <div className="flex items-center gap-3 mb-3">
        {/* Progress dots */}
        <div className="flex gap-1 shrink-0">
          {quiz.questions.map((_: any, i: number) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i < currentIdx ? 'bg-primary w-4' : i === currentIdx ? 'bg-primary w-6' : 'bg-muted w-1.5'}`} />
          ))}
        </div>
        {/* Timer */}
        {!isTimeAttack && (
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock className={`h-3.5 w-3.5 ${timeLeft <= 3 ? 'text-red-400 animate-timer-pulse' : 'text-muted-foreground'}`} />
            <span className={`text-lg font-bold font-mono tabular-nums ${timeLeft <= 3 ? 'text-red-400 animate-timer-pulse' : timeLeft <= 7 ? 'text-gold' : 'text-foreground'}`}>{timeLeft}</span>
          </div>
        )}
        {isTimeAttack && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-lg font-bold font-mono text-gold">{timeAttackTimeLeft}s</span>
          </div>
        )}
      </div>

      {/* Timer bar */}
      {!isTimeAttack && (
        <div className="h-0.5 bg-muted rounded-full overflow-hidden mb-4">
          <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${timePct}%`, background: timeColor }} />
        </div>
      )}

      {/* Question card — flex-1 to fill space */}
      <Card className={`border-border bg-card shadow-card flex-1 flex flex-col transition-all duration-300 ${slideAnim === 'in' ? 'animate-slide-in-right' : 'animate-slide-out-left'}`}>
        <CardContent className="pt-5 pb-5 flex-1 flex flex-col">
          {/* Question */}
          <h2 className="text-lg sm:text-xl font-bold mb-4 leading-snug">{question.text}</h2>

          {/* Options — flex-1 to fill, gap-2 for compactness */}
          <div className="grid gap-2 flex-1">
            {question.options.map((opt: string, i: number) => {
              const isSelected = selectedIdx === i;
              const isCorrect = correctIdx === i;

              // Determine styling based on feedback state
              // Check if this option was eliminated by hint
              const isEliminated = eliminatedOptions.includes(i);

              let stateClass = 'border-border bg-card hover:border-primary/40 hover:bg-accent';
              if (isEliminated && !showFeedback) {
                stateClass = 'border-border opacity-30 line-through';
              }
              if (showFeedback) {
                if (isCorrect) {
                  stateClass = 'border-primary bg-primary/10 ring-2 ring-primary/30';
                } else if (isSelected) {
                  stateClass = 'border-destructive bg-destructive/10 ring-2 ring-destructive/30';
                } else {
                  stateClass = 'border-border opacity-40';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => { if (!showFeedback && !isEliminated) { handleAnswer(i); trigger('select'); } }}
                  disabled={showFeedback || isEliminated}
                  className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all press ${stateClass}`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    showFeedback && isCorrect ? 'bg-primary text-primary-foreground' :
                    showFeedback && isSelected ? 'bg-destructive text-white' :
                    'border border-border text-muted-foreground'
                  }`}>{String.fromCharCode(65 + i)}</div>
                  <span className="flex-1 text-sm font-medium">{opt}</span>
                  {/* Icons */}
                  {showFeedback && isCorrect && <Check className="h-4 w-4 text-primary shrink-0" />}
                  {showFeedback && isSelected && !isCorrect && <X className="h-4 w-4 text-destructive shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          {showFeedback && (
            <div className="mt-3 text-center animate-fade-in">
              {selectedIdx === correctIdx ? (
                <span className="text-sm font-bold text-primary">✓ {ui(lang, 'correct')}</span>
              ) : selectedIdx === -1 ? (
                <span className="text-sm font-bold text-destructive">⏰ {ui(lang, 'times_up')}</span>
              ) : (
                <span className="text-sm font-bold text-destructive">✗ {ui(lang, 'correct_answer_is')}</span>
              )}
            </div>
          )}

          {/* Next button — appears after delay */}
          {showNext && (
            <div className="mt-3 flex justify-end animate-slide-in-up">
              <Button onClick={handleNext} disabled={submitting} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-6 h-11 press">
                {submitting ? 'Loading...' : isLast || isTimeAttack ? `🎉 ${t.player_finish}` : `${t.player_next} →`}
              </Button>
            </div>
          )}

          {/* Hint button + Keyboard hint */}
          {!showFeedback && (
            <div className="mt-2 flex items-center justify-between">
              {showHintButton && hintsLeft > 0 ? (
                <button
                  onClick={useHint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-medium press"
                >
                  💡 50/50 ({hintsLeft} {ui(lang, 'hints_left')})
                </button>
              ) : (
                <div className="text-[9px] text-muted-foreground">
                  {hintsLeft === 0 ? '💡 No hints' : ''}
                </div>
              )}
              <div className="text-[9px] text-muted-foreground">
                <kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono text-[8px]">1</kbd>-<kbd className="px-1 py-0.5 rounded border border-border bg-muted font-mono text-[8px]">4</kbd> or tap
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
