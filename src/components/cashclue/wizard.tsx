'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  Rocket as RocketIcon,
  Video,
  GraduationCap,
  BedDouble,
  Users,
  RefreshCw,
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
import { useLang } from './language-context';
import type { HustlePlan, HustleIdea, ThemeId } from '@/lib/ai';

const FREE_CREDITS = 3;

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

const THEME_ICONS: Record<ThemeId, React.ComponentType<{ className?: string }>> = {
  sideHustle: Wallet,
  startup: RocketIcon,
  content: Video,
  career: GraduationCap,
  passive: BedDouble,
};

function IdeaCard({
  idea,
  index,
  recommended,
  t,
}: {
  idea: HustleIdea;
  index: number;
  recommended: boolean;
  t: ReturnType<typeof useLang>['t'];
}) {
  return (
    <Card
      className={`relative overflow-hidden border-border bg-card/70 backdrop-blur transition-all hover:border-[var(--emerald-glow)]/40 ${
        recommended ? 'ring-1 ring-[var(--emerald-glow)]/50' : ''
      }`}
    >
      {recommended && (
        <div className="absolute top-0 right-0 bg-[var(--emerald-glow)] text-black text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 z-10">
          <Trophy className="h-3 w-3" /> {t.res_recommended}
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--emerald-glow)]/15 text-[var(--emerald-glow)] font-bold text-sm">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl font-bold leading-tight">{idea.name}</CardTitle>
            <p className="text-sm text-[var(--gold)] mt-1 italic">&quot;{idea.tagline}&quot;</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-xs">{idea.category}</Badge>
          <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[idea.difficulty] ?? ''}`}>
            {idea.difficulty}
          </Badge>
          <Badge variant="outline" className={`text-xs ${SCALABILITY_COLORS[idea.scalability] ?? ''}`}>
            <Repeat className="h-3 w-3 mr-1" />
            {idea.scalability}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Coins className="h-3 w-3 text-[var(--emerald-glow)]" />
              {t.res_monthlyIncome}
            </div>
            <div className="text-sm font-bold text-[var(--emerald-glow)]">
              {formatMoney(idea.monthlyIncomeRange.min)} – {formatMoney(idea.monthlyIncomeRange.max)}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Wallet className="h-3 w-3 text-[var(--gold)]" />
              {t.res_startupCost}
            </div>
            <div className="text-sm font-bold">{formatMoney(idea.startupCost)}</div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Zap className="h-3 w-3 text-[var(--emerald-glow)]" />
              {t.res_firstDollar}
            </div>
            <div className="text-sm font-bold">{idea.timeToFirstDollar}</div>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3 text-[var(--gold)]" />
              {t.res_profitable}
            </div>
            <div className="text-sm font-bold">{idea.timeToProfitable}</div>
          </div>
        </div>

        <div>
          <p className="text-sm leading-relaxed text-foreground/90">{idea.pitch}</p>
        </div>

        <div className="rounded-lg border border-[var(--emerald-glow)]/30 bg-[var(--emerald-glow)]/5 p-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--emerald-glow)] mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[var(--emerald-glow)] uppercase tracking-wide mb-1">
                {t.res_unfair}
              </div>
              <p className="text-sm text-foreground/90">{idea.unfairAdvantage}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-start gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {t.res_howPaid}
              </div>
              <p className="text-sm text-foreground/90">{idea.monetizationModel}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="h-4 w-4 text-[var(--emerald-glow)]" />
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t.res_roadmap}
            </h4>
          </div>
          <ol className="space-y-3">
            {idea.roadmap.map((step, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--emerald-glow)]/40 bg-[var(--emerald-glow)]/10 text-xs font-bold text-[var(--emerald-glow)]">
                    {i + 1}
                  </div>
                  {i < idea.roadmap.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-sm font-semibold">{step.title}</h5>
                    <Badge variant="outline" className="text-[10px] py-0 h-4">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-[var(--gold)]" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.res_tools}
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

        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.res_risks}
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

interface JobStatus {
  jobId: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  position: number;
  result?: HustlePlan;
  error?: string;
  latencyMs?: number;
}

export function Wizard({ initialTheme = 'sideHustle' }: { initialTheme?: ThemeId }) {
  const { t, lang } = useLang();
  const { toast } = useToast();
  const [theme, setTheme] = useState<ThemeId>(initialTheme);

  // Sync when parent ThemeShowcase changes selection
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const [form, setForm] = useState({
    skills: '',
    hoursPerWeek: '10',
    budget: '500',
    goal: '',
    riskTolerance: 'medium' as 'low' | 'medium' | 'high',
  });
  const [hours, setHours] = useState(10);
  const [budget, setBudget] = useState(500);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobStatus | null>(null);
  const [plan, setPlan] = useState<HustlePlan | null>(null);
  const [credits, setCreditsState] = useState<number>(FREE_CREDITS);
  const [showPaywall, setShowPaywall] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch initial credits from server
  useEffect(() => {
    fetch('/api/credits')
      .then((r) => r.json())
      .then((d) => setCreditsState(d.credits ?? FREE_CREDITS))
      .catch(() => {});
  }, []);

  // Track page view
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'page_view' }),
    }).catch(() => {});
  }, []);

  const update = useCallback((patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch })), []);

  const handleThemeChange = (newTheme: ThemeId) => {
    setTheme(newTheme);
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'theme_select', properties: { theme: newTheme } }),
    }).catch(() => {});
  };

  const LOADING_MESSAGES = [
    t.wiz_loading_1,
    t.wiz_loading_2,
    t.wiz_loading_3,
    t.wiz_loading_4,
    t.wiz_loading_5,
    t.wiz_loading_6,
  ];
  const [loadingMsg, setLoadingMsg] = useState(0);

  const themeOptions: { id: ThemeId; label: string; desc: string }[] = [
    { id: 'sideHustle', label: t.theme_sideHustle, desc: t.theme_sideHustle_desc },
    { id: 'startup', label: t.theme_startup, desc: t.theme_startup_desc },
    { id: 'content', label: t.theme_content, desc: t.theme_content_desc },
    { id: 'career', label: t.theme_career, desc: t.theme_career_desc },
    { id: 'passive', label: t.theme_passive, desc: t.theme_passive_desc },
  ];

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => () => stopPolling(), []);

  const startPolling = (jobId: string) => {
    stopPolling();
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(msgIdx);
    }, 2500);

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${jobId}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data: JobStatus = await res.json();
        setJob(data);

        if (data.status === 'completed' && data.result) {
          stopPolling();
          clearInterval(msgInterval);
          setPlan(data.result);
          setLoading(false);
          setCreditsState((c) => Math.max(0, c - 1));
          toast({
            title: t.wiz_success_title,
            description: `${t.wiz_success_desc} (${data.latencyMs ? Math.round(data.latencyMs / 1000) : 0}s)`,
          });
          setTimeout(() => {
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else if (data.status === 'failed') {
          stopPolling();
          clearInterval(msgInterval);
          setLoading(false);
          // Credit was refunded server-side
          setCreditsState((c) => c + 1);
          toast({
            title: t.wiz_error_failed,
            description: data.error || t.wiz_error_failed_desc,
            variant: 'destructive',
          });
        }
      } catch {
        // ignore transient polling errors
      }
    }, 1500);
  };

  const handleGenerate = async () => {
    if (!form.skills.trim() && !form.goal.trim()) {
      toast({
        title: t.wiz_error_empty,
        description: t.wiz_error_empty_desc,
        variant: 'destructive',
      });
      return;
    }

    if (credits <= 0) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setPlan(null);
    setJob(null);
    setLoadingMsg(0);

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'generate_click', properties: { theme, lang } }),
    }).catch(() => {});

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, theme, lang }),
      });

      if (res.status === 429) {
        const data = await res.json();
        toast({
          title: 'Rate limit',
          description: data.error || 'Too many requests. Try again later.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (res.status === 402) {
        setShowPaywall(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Generation failed');
      }

      const data = await res.json();
      setJob({
        jobId: data.jobId,
        status: data.status,
        position: data.position,
      });
      setCreditsState(data.creditsRemaining);
      startPolling(data.jobId);
    } catch (e: any) {
      setLoading(false);
      toast({
        title: t.wiz_error_failed,
        description: e?.message || t.wiz_error_failed_desc,
        variant: 'destructive',
      });
    }
  };

  const reset = () => {
    setPlan(null);
    setJob(null);
    document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Progress UI for queued / running states
  const renderProgress = () => {
    if (!job || !loading) return null;
    const inQueue = job.status === 'queued' && job.position > 0;
    return (
      <Card className="border-[var(--emerald-glow)]/40 bg-gradient-to-br from-[var(--emerald-glow)]/10 to-transparent mb-6">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {inQueue ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--emerald-glow)]/15 text-[var(--emerald-glow)]">
                  <Users className="h-6 w-6" />
                </div>
              ) : (
                <Loader2 className="h-12 w-12 text-[var(--emerald-glow)] animate-spin" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              {inQueue ? (
                <>
                  <p className="text-sm font-semibold">
                    {t.wiz_loading_queue_pos || 'In queue'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Position #{job.position} — waiting for {job.position - 1} request{job.position === 2 ? '' : 's'}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold">{LOADING_MESSAGES[loadingMsg]}</p>
                  <p className="text-xs text-muted-foreground">{t.wiz_generate_hint}</p>
                </>
              )}
              <div className="mt-2 h-1.5 bg-background/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--emerald-glow)] to-[var(--gold)] transition-all duration-700"
                  style={{
                    width: inQueue ? `${Math.max(10, 100 - job.position * 15)}%` : '70%',
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="wizard" className="relative scroll-mt-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {!plan && (
          <>
            {renderProgress()}
            <Card className="border-border bg-card/70 backdrop-blur-xl overflow-hidden relative">
              <div className="absolute inset-x-0 -top-20 h-40 bg-[var(--emerald-glow)]/10 blur-3xl pointer-events-none" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                      <Wand2 className="h-6 w-6 text-[var(--emerald-glow)]" />
                      {t.wiz_title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{t.wiz_sub}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
                    <span className="text-xs text-muted-foreground">
                      <strong className="text-foreground">{credits}</strong> / {FREE_CREDITS} {t.wiz_credits}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative">
                {/* Compact theme indicator — full picker is above in ThemeShowcase */}
                <div className="flex items-center justify-between gap-2 flex-wrap rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {t.theme_label}:
                    </span>
                    <Badge variant="outline" className="font-semibold text-[var(--emerald-glow)] border-[var(--emerald-glow)]/40">
                      {(() => {
                        const opt = themeOptions.find((o) => o.id === theme);
                        const Icon = THEME_ICONS[theme];
                        return (
                          <>
                            {Icon && <Icon className="h-3 w-3 mr-1" />}
                            {opt?.label}
                          </>
                        );
                      })()}
                    </Badge>
                  </div>
                  <a
                    href="#themes"
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                  >
                    Change →
                  </a>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-sm font-medium">
                    {t.wiz_skills_label} <span className="text-muted-foreground font-normal">{t.wiz_skills_hint}</span>
                  </Label>
                  <Textarea
                    id="skills"
                    placeholder={t.wiz_skills_placeholder}
                    value={form.skills}
                    onChange={(e) => update({ skills: e.target.value })}
                    rows={3}
                    className="resize-none bg-background/60"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hours" className="text-sm font-medium">{t.wiz_hours_label}</Label>
                    <Badge variant="outline" className="font-mono text-[var(--emerald-glow)]">{hours}h</Badge>
                  </div>
                  <Slider
                    id="hours"
                    min={1}
                    max={40}
                    step={1}
                    value={[hours]}
                    onValueChange={(v) => { setHours(v[0]); update({ hoursPerWeek: String(v[0]) }); }}
                    className="[&_[role=slider]]:bg-[var(--emerald-glow)] [&_[role=slider]]:border-[var(--emerald-glow)]"
                    disabled={loading}
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{t.wiz_hours_casual}</span>
                    <span>{t.wiz_hours_side}</span>
                    <span>{t.wiz_hours_grind}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="budget" className="text-sm font-medium">{t.wiz_budget_label}</Label>
                    <Badge variant="outline" className="font-mono text-[var(--gold)]">{formatMoney(budget)}</Badge>
                  </div>
                  <Slider
                    id="budget"
                    min={0}
                    max={10000}
                    step={50}
                    value={[budget]}
                    onValueChange={(v) => { setBudget(v[0]); update({ budget: String(v[0]) }); }}
                    className="[&_[role=slider]]:bg-[var(--gold)] [&_[role=slider]]:border-[var(--gold)]"
                    disabled={loading}
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{t.wiz_budget_broke}</span>
                    <span>{t.wiz_budget_boot}</span>
                    <span>{t.wiz_budget_funded}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-sm font-medium">
                    {t.wiz_goal_label} <span className="text-muted-foreground font-normal">{t.wiz_goal_hint}</span>
                  </Label>
                  <Input
                    id="goal"
                    placeholder={t.wiz_goal_placeholder}
                    value={form.goal}
                    onChange={(e) => update({ goal: e.target.value })}
                    className="bg-background/60"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t.wiz_risk_label}</Label>
                  <RadioGroup
                    value={form.riskTolerance}
                    onValueChange={(v) => update({ riskTolerance: v as 'low' | 'medium' | 'high' })}
                    className="grid grid-cols-3 gap-2"
                  >
                    {[
                      { value: 'low', label: t.wiz_risk_low, desc: t.wiz_risk_low_desc },
                      { value: 'medium', label: t.wiz_risk_med, desc: t.wiz_risk_med_desc },
                      { value: 'high', label: t.wiz_risk_high, desc: t.wiz_risk_high_desc },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        htmlFor={`risk-${opt.value}`}
                        className={`cursor-pointer rounded-lg border p-3 transition-all hover:border-[var(--emerald-glow)]/40 ${
                          form.riskTolerance === opt.value
                            ? 'border-[var(--emerald-glow)] bg-[var(--emerald-glow)]/10'
                            : 'border-border bg-background/40'
                        } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <RadioGroupItem value={opt.value} id={`risk-${opt.value}`} className="sr-only" />
                        <div className="text-sm font-semibold">{opt.label}</div>
                        <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

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
                        {t.wiz_generate}
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">{t.wiz_generate_hint}</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {plan && (
          <div id="results" className="space-y-6 scroll-mt-20">
            <Card className="border-[var(--emerald-glow)]/40 bg-gradient-to-br from-[var(--emerald-glow)]/10 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--emerald-glow)]/20 text-[var(--emerald-glow)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">{t.res_strategy_title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{plan.executiveSummary}</p>
              </CardContent>
            </Card>

            <div className="space-y-5">
              {plan.ideas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} recommended={i === plan.recommendedPick} t={t} />
              ))}
            </div>

            <Card className="border-[var(--gold)]/30 bg-[var(--gold)]/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[var(--gold)]" />
                  <CardTitle className="text-lg">{t.res_quickWins}</CardTitle>
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

            <Card className="border-border bg-card/70">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[var(--emerald-glow)]" />
                  <CardTitle className="text-lg">{t.res_longTerm}</CardTitle>
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={reset} size="lg" variant="outline" className="font-semibold">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.res_regenerate}
              </Button>
              {credits > 0 ? (
                <p className="text-sm text-muted-foreground self-center">
                  <strong className="text-foreground">{credits}</strong> {t.res_left}.
                </p>
              ) : (
                <Button asChild size="lg" className="bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 font-semibold">
                  <a href="#pricing">
                    <Lock className="h-4 w-4 mr-2" />
                    {t.res_unlock}
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
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{t.price_sub}</p>
              <Button asChild className="bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90 font-bold">
                <a href="#pricing">{t.nav_pricing}</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
