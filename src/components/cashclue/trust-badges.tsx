'use client';

import { Shield, Globe, Zap, Gift } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    { icon: Gift, label: '3 free plans', sub: 'no signup' },
    { icon: Globe, label: '5 languages', sub: 'EN · RU · ES · DE · FR' },
    { icon: Zap, label: '5 modes', sub: 'hustle · startup · content' },
    { icon: Shield, label: 'No data sold', sub: 'cookie-only auth' },
  ];

  return (
    <section className="relative py-4 sm:py-6 border-b border-border/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 sm:gap-3 rounded-lg border border-border/60 bg-card/40 backdrop-blur px-3 py-2 sm:px-4 sm:py-2.5"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--emerald-glow)] shrink-0" />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-xs sm:text-sm font-semibold truncate">{b.label}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{b.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
