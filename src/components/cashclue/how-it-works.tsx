'use client';

import { Brain, LineChart, Rocket } from 'lucide-react';
import { useLang } from './language-context';

export function HowItWorks() {
  const { t } = useLang();
  const STEPS = [
    { icon: Brain, title: t.how_step1_title, desc: t.how_step1_desc, accent: 'var(--emerald-glow)' },
    { icon: LineChart, title: t.how_step2_title, desc: t.how_step2_desc, accent: 'var(--gold)' },
    { icon: Rocket, title: t.how_step3_title, desc: t.how_step3_desc, accent: 'var(--emerald-glow)' },
  ];

  return (
    <section id="how" className="relative scroll-mt-20 py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t.how_title}
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            {t.how_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="relative rounded-xl border border-border bg-card/50 backdrop-blur p-6 transition-all hover:border-[var(--emerald-glow)]/30"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${s.accent} 15%, transparent)`,
                    color: s.accent,
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
