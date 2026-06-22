'use client';

import { Brain, LineChart, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon: Brain,
    title: '1. Describe yourself',
    desc: 'Tell the AI your skills, available hours, budget, and goal. Be honest — garbage in, garbage out.',
    accent: 'var(--emerald-glow)',
  },
  {
    icon: LineChart,
    title: '2. AI builds your plan',
    desc: 'CashClue analyzes 50+ hustle models against your profile, runs income projections, and stress-tests for risks.',
    accent: 'var(--gold)',
  },
  {
    icon: Rocket,
    title: '3. Execute the roadmap',
    desc: 'Get 3 personalized hustles with step-by-step roadmaps, real tools, and quick wins you can do this week.',
    accent: 'var(--emerald-glow)',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-20 py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            From zero to plan in 30 seconds.
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Three steps. No fluff. No 47-page PDF you&apos;ll never read.
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
