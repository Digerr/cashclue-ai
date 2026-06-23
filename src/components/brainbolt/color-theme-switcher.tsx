'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Sun, Moon } from 'lucide-react';
import { THEMES, useColorTheme } from './color-theme-context';

export function ColorThemeSwitcher() {
  const { theme, setTheme, mode, toggleMode } = useColorTheme();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const current = THEMES.find(t => t.id === theme) ?? THEMES[0];

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleMode}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors press"
          aria-label="Toggle dark/light"
          title={mode === 'dark' ? 'Light' : 'Dark'}
        >
          {mode === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors press"
          aria-label="Switch color theme"
          title={current.label}
        >
          <div className="flex h-4 w-4 overflow-hidden rounded-sm border border-border">
            {current.swatch.slice(0, 2).map((c, i) => (
              <div key={i} className="flex-1" style={{ background: c }} />
            ))}
          </div>
        </button>
      </div>

      {/* Dropdown — fixed positioning, opens left from button */}
      {open && btnRef.current && (
        <div
          className="fixed z-[200] w-48 rounded-xl border border-border bg-popover shadow-lg-card overflow-hidden max-h-[70vh] overflow-y-auto animate-scale-in"
          style={{
            right: '8px',
            top: btnRef.current.getBoundingClientRect().bottom + 4 + 'px',
          }}
        >
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
            Color theme
          </div>
          {THEMES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTheme(t.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent transition-colors ${t.id === theme ? 'text-primary' : 'text-foreground/80'}`}
            >
              <div className="flex h-6 w-6 overflow-hidden rounded-md border border-border shrink-0">
                {t.swatch.map((c, i) => (
                  <div key={i} className="flex-1" style={{ background: c }} />
                ))}
              </div>
              <span className="flex-1 text-left">{t.label}</span>
              {t.id === theme && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
