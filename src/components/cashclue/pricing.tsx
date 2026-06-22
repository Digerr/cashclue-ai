'use client';

import { Check, Sparkles, Crown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLang } from './language-context';

export function Pricing() {
  const { t } = useLang();

  const PLANS = [
    {
      name: t.price_starter,
      tagline: t.price_starter_tag,
      price: 0,
      period: t.price_forever,
      icon: Sparkles,
      accent: 'var(--emerald-glow)',
      features: t.feat_starter,
      cta: t.price_cta_free,
      highlighted: false,
    },
    {
      name: t.price_pro,
      tagline: t.price_pro_tag,
      price: 19,
      period: t.price_month,
      icon: Zap,
      accent: 'var(--gold)',
      features: t.feat_pro,
      cta: t.price_cta_pro,
      highlighted: true,
      badge: t.price_popular,
    },
    {
      name: t.price_empire,
      tagline: t.price_empire_tag,
      price: 49,
      period: t.price_month,
      icon: Crown,
      accent: 'var(--gold)',
      features: t.feat_empire,
      cta: t.price_cta_empire,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative scroll-mt-20 py-16 sm:py-24 border-t border-border">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 text-[var(--gold)] border-[var(--gold)]/40">
            {t.price_badge}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t.price_title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            {t.price_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <Card
                key={i}
                className={`relative overflow-hidden transition-all ${
                  plan.highlighted
                    ? 'border-[var(--gold)]/50 bg-gradient-to-b from-[var(--gold)]/8 to-transparent ring-1 ring-[var(--gold)]/30 md:-translate-y-2'
                    : 'border-border bg-card/60 hover:border-[var(--emerald-glow)]/30'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-[var(--gold)] text-black text-[10px] font-bold px-2.5 py-1 rounded-bl-lg uppercase tracking-wide">
                    {plan.badge}
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${plan.accent} 15%, transparent)`,
                        color: plan.accent,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className={`w-full font-semibold ${
                      plan.highlighted
                        ? 'bg-[var(--gold)] text-black hover:bg-[var(--gold)]/90'
                        : 'bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: plan.accent }}
                        />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          {t.price_guarantee}
        </p>
      </div>
    </section>
  );
}
