'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, Globe } from 'lucide-react';
import { LANGS } from '@/lib/i18n';
import { useLang } from './language-context';

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
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

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-lg border border-border bg-popover shadow-xl overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors ${
                l.code === lang ? 'text-[var(--emerald-glow)]' : 'text-foreground'
              }`}
            >
              <span className="text-base leading-none">{l.flag}</span>
              <span className="flex-1 text-left">{l.label}</span>
              {l.code === lang && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
