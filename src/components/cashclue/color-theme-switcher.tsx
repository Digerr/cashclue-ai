'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES, useColorTheme } from './color-theme-context';

export function ColorThemeSwitcher() {
  const { theme, setTheme } = useColorTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm"
        aria-label="Switch color theme"
        title={`Theme: ${current.label}`}
      >
        <Palette className="h-4 w-4" />
        <div className="flex h-4 w-4 overflow-hidden rounded-sm border border-border">
          {current.swatch.slice(0, 2).map((c, i) => (
            <div key={i} className="flex-1" style={{ background: c }} />
          ))}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-lg border border-border bg-popover shadow-xl overflow-hidden">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
            Color theme
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent transition-colors ${
                t.id === theme ? 'text-foreground' : 'text-foreground/80'
              }`}
            >
              <div className="flex h-6 w-6 overflow-hidden rounded-md border border-border shrink-0">
                {t.swatch.map((c, i) => (
                  <div key={i} className="flex-1" style={{ background: c }} />
                ))}
              </div>
              <span className="flex-1 text-left">{t.label}</span>
              {t.id === theme && <Check className="h-3.5 w-3.5 text-[var(--emerald-glow)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
