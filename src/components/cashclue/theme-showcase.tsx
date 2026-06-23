'use client';

import { useState } from 'react';
import {
  Wallet,
  Rocket,
  Video,
  GraduationCap,
  BedDouble,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLang } from './language-context';
import type { ThemeId } from '@/lib/ai';

const THEME_META: Record<
  ThemeId,
  { icon: React.ComponentType<{ className?: string }>; accent: string; emoji: string }
> = {
  sideHustle: { icon: Wallet, accent: 'var(--emerald-glow)', emoji: '💵' },
  startup: { icon: Rocket, accent: 'var(--gold)', emoji: '🚀' },
  content: { icon: Video, accent: '#f472b6', emoji: '🎥' },
  career: { icon: GraduationCap, accent: '#60a5fa', emoji: '🎯' },
  passive: { icon: BedDouble, accent: '#a78bfa', emoji: '🛌' },
};

export function ThemeShowcase({
  selected,
  onSelect,
}: {
  selected: ThemeId;
  onSelect: (t: ThemeId) => void;
}) {
  const { t } = useLang();
  const [hovered, setHovered] = useState<ThemeId | null>(null);

  const themes: { id: ThemeId; label: string; desc: string }[] = [
    { id: 'sideHustle', label: t.theme_sideHustle, desc: t.theme_sideHustle_desc },
    { id: 'startup', label: t.theme_startup, desc: t.theme_startup_desc },
    { id: 'content', label: t.theme_content, desc: t.theme_content_desc },
    { id: 'career', label: t.theme_career, desc: t.theme_career_desc },
    { id: 'passive', label: t.theme_passive, desc: t.theme_passive_desc },
  ];

  return (
    <section id="themes" className="relative scroll-mt-20 py-12 sm:py-16 border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            5 modes · 5 languages · 1 AI strategist
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            {t.theme_label}
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            {t.wiz_sub}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {themes.map((theme) => {
            const meta = THEME_META[theme.id];
            const Icon = meta.icon;
            const isActive = selected === theme.id;
            const isHovered = hovered === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelect(theme.id);
                  document.getElementById('wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                onMouseEnter={() => setHovered(theme.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative text-left rounded-2xl border bg-card/60 backdrop-blur p-4 sm:p-5 transition-all hover:-translate-y-1"
                style={{
                  borderColor: isActive || isHovered ? meta.accent : 'var(--border)',
                  boxShadow: isActive || isHovered ? `0 8px 32px -8px ${meta.accent}40` : 'none',
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute -top-1.5 -right-1.5 h-3 w-3 rounded-full"
                    style={{ background: meta.accent, boxShadow: `0 0 12px ${meta.accent}` }}
                  />
                )}

                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl mb-3 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `color-mix(in oklch, ${meta.accent} 15%, transparent)`,
                    color: meta.accent,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1">{theme.label}</h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug mb-3">
                  {theme.desc}
                </p>
                <div
                  className="flex items-center gap-1 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: meta.accent }}
                >
                  {t.cta_getPlan}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
