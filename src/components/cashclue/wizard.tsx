'use client';

import { useState } from 'react';
import {
  Loader2,
  Sparkles,
  Wand2,
  Lock,
  Coins,
  Clock,
  Wallet,
  Trophy,
  AlertTriangle,
  Rocket,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Repeat,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { HustleInput, HustlePlan, HustleIdea } from '@/lib/ai';

const FREE_CREDITS = 3;
const STORAGE_KEY = 'cashclue:credits';

function getCredits(): number {
  if (typeof window === 'undefined') return FREE_CREDITS;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === null) return FREE_CREDITS;
  const n = parseInt(stored, 10);
  return Number.isFinite(n) ? n : FREE_CREDITS;
}

function setCredits(n: number) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, String(Math.max(0, n)));
}

const LOADING_MESSAGES = [
  'Analyzing your skills...',
  'Scanning 2026 market trends...',
  'Crunching income projections...',
  'Comparing 50+ side-hustle models...',
  'Building your roadmap...',
  'Stress-testing for risks...',
];

function formatMoney(n: number): string {
  if (n === 0) return '$0';
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n.toLocaleString()}`;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40 bg-[var(--emerald-glow)]/10',
  Medium: 'text-[var(--gold)] border-[var(--gold)]/40 bg-[var(--gold)]/10',
  Hard: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
};

const SCALABILITY_COLORS: Record<string, string> = {
  Low: 'text-muted-foreground border-border',
  Medium: 'text-blue-300 border-blue-400/40',
  High: 'text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40',
  Unlimited: 'text-[var(--gold)] border-[var(--gold)]/40 bg-[var(--gold)]/10',
};

function IdeaCard({
  idea,
  index,
  recommended,
}: {
  idea: HustleIdea;
  index: number;
  recommended: boolean;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-border bg-card/70 backdrop-blur transition-all hover:border-[var(--emerald-glow)]/40 ${
        recommended ? 'ring-1 ring-[var(--emerald-glow)]/50' : ''
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-[var(--emerald-glow)] text-black text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Trophy className="h-3 w-3" /> RECOMMENDED
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--emerald-glow)]/15 text-[var(--emerald-glow)] font-bold text-sm">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">
              {idea.name}
            </CardTitle>
            <p className="text-sm text-[var(--gold)] mt-1 italic">"{idea.tagline}"</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {idea.category}
          </Badge>
          <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[idea.difficulty] ?? ''}`}>
            {idea.difficulty}
          </Badge>
          <Badge variant="outline" className={`text-xs ${SCALABILITY_COLORS[idea.scalability] ?? ''}`}>
            <Repeat className="h-3 w-3 mr-1" />
            {idea.scalability} scale
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Coins className="h-3 w-3 text-[var(--emerald-glow)]" />
              Monthly income
            </div>
            <div className="text-sm font-bold text-[var(--emerald-glow)]">
              {formatMoney(idea.monthlyIncomeRange.min)} – {formatMoney(idea.monthlyIncomeRange.max)}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Wallet className="h-3 w-3 text-[var(--gold)]" />
              Startup cost
            </div>
            <div className="text-sm font-bold">{formatMoney(idea.startupCost)}</div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Zap className="h-3 w-3 text-[var(--emerald-glow)]" />
              First $
            </div>
            <div className="text-sm font-bold">{idea.timeToFirstDollar}</div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3 text-[var(--gold)]" />
              Profitable
            </div>
            <div className="text-sm font-bold">{idea.timeToProfitable}</div>
          </div>
        </div>

        {/* Pitch */}
        <div>
          <p className="text-sm leading-relaxed text-foreground/90">{idea.pitch}</p>
        </div>

        {/* Unfair advantage */}
        <div className="rounded-lg border border-[var(--emerald-glow)]/30 bg-[var(--emerald-glow)]/5 p-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--emerald-glow)] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[var(--emerald-glow)] uppercase tracking-wide mb-1">
                Your unfair advantage
              </div>
              <p className="text-sm text-foreground/90">{idea.unfairAdvantage}</p>
            </div>
          </div>
        </div>

        {/* Monetization model */}
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-start gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                How you get paid
              </div>
              <p className="text-sm text-foreground/90">{idea.monetizationModel}</p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="h-4 w-4 text-[var(--emerald-glow)]" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Roadmap
            </h4>
          </div>
          <ol className="space-y-3">
            {idea.roadmap.map((step, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--emerald-glow)]/40 bg-[var(--emerald-glow)]/10 text-xs font-bold text-[var(--emerald-glow)]">
                    {i + 1}
                  </div>
                  {i < idea.roadmap.length - 1 && (
                    <div className="w-px flex-1 bg-border my-1" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-sm font-semibold">{step.title}</h5>
                    <Badge variant="outline" className="text-[10px] py-0 h-4">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Resources */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-[var(--gold)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Tools & Resources
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {idea.keyResources.map((r, i) => (
              <Badge key={i} variant="secondary" className="text-xs font-normal">
                {r}
              </Badge>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Honest risks
            </h4>
          </div>
          <ul className="space-y-1.5">
            {idea.risks.map((r, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function Wizard() {
  const { toast } = useToast();
  const [form, setForm] = useState<HustleInput>({
    skills: '',
    hoursPerWeek: '10',
    budget: '500',
    goal: '',
    riskTolerance: 'medium',
  });
  const [hours, setHours] = useState(10);
  const [budget, setBudget] = useState(500);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [plan, setPlan] = useState<HustlePlan | null>(null);
  const [credits, setCreditsState] = useState<number>(FREE_CREDITS);
  const [showPaywall, setShowPaywall] = useState(false);

  // Initialize credits from localStorage on mount
  useState(() => {
    setCreditsState(getCredits());
  });

  const update = (patch: Partial<HustleInput>) => setForm((f) => ({ ...f, ...patch }));

  const handleGenerate = async () => {
    if (!form.skills.trim() && !form.goal.trim()) {
      toast({
        title: 'Tell us about you first',
        description: 'Add your skills or your goal so the AI has something to work with.',
        variant: 'destructive',
      });
      return;
    }

    const current = getCredits();
    if (current <= 0) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setPlan(null);
    setLoadingMsg(0);

    const interval = setInterval(() => {
      setLoadingMsg((m) => (m + 1) % LOADING_MESSAGES.length);
    }, 1800);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Generation failed');
      }

      const data: HustlePlan = await res.json();
      setPlan(data);

      const newCredits = current - 1;
      setCredits(newCredits);
      setCreditsState(newCredits);

      toast({
        title: 'Your plan is ready',
        description: `3 personalized hustles generated. ${newCredits} free credits left.`,
      });

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e: any) {
      toast({
        title: 'Generation failed',
        description: e?.message || 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const reset = () => {
    setPlan(null);
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="wizard" className="relative scroll-mt-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {!plan && (
          <Card className="border-border bg-card/70 backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-x-0 -top-20 h-40 bg-[var(--emerald-glow)]/10 blur-3xl pointer-events-none" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                    <Wand2 className="h-6 w-6 text-[var(--emerald-glow)]" />
                    Build your hustle plan
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fill this out honestly. The better the input, the sharper the plan.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
                  <span className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{credits}</strong> / {FREE_CREDITS} free credits
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 relative">
              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium">
                  What are you good at? <span className="text-muted-foreground font-normal">(skills, hobbies, past jobs)</span>
                </Label>
                <Textarea
                  id="skills"
                  placeholder="e.g. I write Python for a fintech, I'm decent at Figma, I love dogs, I used to tutor math in college..."
                  value={form.skills}
                  onChange={(e) => update({ skills: e.target.value })}
                  rows={3}
                  className="resize-none bg-background/60"
                />
              </div>

              {/* Hours */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hours" className="text-sm font-medium">
                    Hours per week you can commit
                  </Label>
                  <Badge variant="outline" className="font-mono text-[var(--emerald-glow)]">
                    {hours}h / week
                  </Badge>
                </div>
                <Slider
                  id="hours"
                  min={1}
                  max={40}
                  step={1}
                  value={[hours]}
                  onValueChange={(v) => {
                    setHours(v[0]);
                    update({ hoursPerWeek: String(v[0]) });
                  }}
                  className="[&_[role=slider]]:bg-[var(--emerald-glow)] [&_[role=slider]]:border-[var(--emerald-glow)]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Casual (1h)</span>
                  <span>Side-gig (10h)</span>
                  <span>Grinding (40h)</span>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="budget" className="text-sm font-medium">
                    Starting capital
                  </Label>
                  <Badge variant="outline" className="font-mono text-[var(--gold)]">
                    {formatMoney(budget)}
                  </Badge>
                </div>
                <Slider
                  id="budget"
                  min={0}
                  max={10000}
                  step={50}
                  value={[budget]}
                  onValueChange={(v) => {
                    setBudget(v[0]);
                    update({ budget: String(v[0]) });
                  }}
                  className="[&_[role=slider]]:bg-[var(--gold)] [&_[role=slider]]:border-[var(--gold)]"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Broke ($0)</span>
                  <span>Bootstrapped ($1k)</span>
                  <span>Funded ($10k)</span>
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium">
                  What&apos;s the goal? <span className="text-muted-foreground font-normal">(optional but helpful)</span>
                </Label>
                <Input
                  id="goal"
                  placeholder="e.g. Replace my $4k/mo salary in 6 months"
                  value={form.goal}
                  onChange={(e) => update({ goal: e.target.value })}
                  className="bg-background/60"
                />
              </div>

              {/* Risk tolerance */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Risk tolerance</Label>
                <RadioGroup
                  value={form.riskTolerance}
                  onValueChange={(v) => update({ riskTolerance: v as 'low' | 'medium' | 'high' })}
                  className="grid grid-cols-3 gap-2"
                >
                  {[
                    { value: 'low', label: 'Safe', desc: 'Slow & steady' },
                    { value: 'medium', label: 'Balanced', desc: 'Some risk' },
                    { value: 'high', label: 'Aggressive', desc: 'High upside' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={`risk-${opt.value}`}
                      className={`cursor-pointer rounded-lg border p-3 transition-all hover:border-[var(--emerald-glow)]/40 ${
                        form.riskTolerance === opt.value
                          ? 'border-[var(--emerald-glow)] bg-[var(--emerald-glow)]/10'
                          : 'border-border bg-background/40'
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={`risk-${opt.value}`} className="sr-only" />
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  size="lg"
                  className="w-full h-12 bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-bold text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {LOADING_MESSAGES[loadingMsg]}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate my money plan
                    </>
                  )}
                </Button>
                <p className="text-[11px] text-center text-muted-foreground mt-2">
                  Takes ~20 seconds. No signup required for your first 3 plans.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {plan && (
          <div id="results" className="space-y-6 scroll-mt-20">
            {/* Executive summary */}
            <Card className="border-[var(--emerald-glow)]/40 bg-gradient-to-br from-[var(--emerald-glow)]/10 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--emerald-glow)]/20 text-[var(--emerald-glow)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">Your AI-generated strategy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  {plan.executiveSummary}
                </p>
              </CardContent>
            </Card>

            {/* Idea cards */}
            <div className="space-y-5">
              {plan.ideas.map((idea, i) => (
                <IdeaCard
                  key={i}
                  idea={idea}
                  index={i}
                  recommended={i === plan.recommendedPick}
                />
              ))}
            </div>

            {/* Quick wins */}
            <Card className="border-[var(--gold)]/30 bg-[var(--gold)]/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[var(--gold)]" />
                  <CardTitle className="text-lg">Quick wins — do these THIS WEEK</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.quickWins.map((q, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90">{q}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Long-term plays */}
            <Card className="border-border bg-card/70">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[var(--emerald-glow)]" />
                  <CardTitle className="text-lg">Long-term plays — 6+ month wealth bets</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.longTermPlays.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <ChevronRight className="h-4 w-4 text-[var(--emerald-glow)] mt-0.5 shrink-0" />
                      <span className="text-foreground/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={reset}
                size="lg"
                variant="outline"
                className="font-semibold"
              >
                Generate another plan
              </Button>
              {credits > 0 ? (
                <p className="text-sm text-muted-foreground self-center">
                  <strong className="text-foreground">{credits}</strong> free credits left.
                </p>
              ) : (
                <Button asChild size="lg" className="bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 font-semibold">
                  <a href="#pricing">
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock unlimited plans
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        {showPaywall && (
          <Card className="mt-6 border-[var(--gold)]/50 bg-[var(--gold)]/5">
            <CardContent className="pt-6 text-center space-y-3">
              <Lock className="h-10 w-10 text-[var(--gold)] mx-auto" />
              <h3 className="text-xl font-bold">You&apos;ve used all your free credits</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Upgrade to Pro for unlimited plan generations, saved history, and exclusive hustle templates updated weekly.
              </p>
              <Button asChild className="bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 font-bold">
                <a href="#pricing">See pricing</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
