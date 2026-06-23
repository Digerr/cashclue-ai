'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from './language-context';
import { LanguageSwitcher } from './language-switcher';
import { ColorThemeSwitcher } from './color-theme-switcher';

export function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [menuOpen]);

  // Lock scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { href: '#themes', label: t.theme_label },
    { href: '#wizard', label: t.cta_getPlan },
    { href: '#how', label: t.nav_how },
    { href: '#examples', label: t.nav_examples },
    { href: '#faq', label: 'FAQ' },
    { href: '#pricing', label: t.nav_pricing },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[var(--emerald-glow)] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg animated-gradient">
                <Sparkles className="h-5 w-5 text-black" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                CashClue<span className="text-[var(--gold)]"> AI</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
                Side-Hustle Strategist
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ColorThemeSwitcher />
            <LanguageSwitcher />
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/Digerr/cashclue-ai"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <Button
              asChild
              size="sm"
              className="hidden sm:flex bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold"
            >
              <Link href="#wizard">{t.cta_getPlan}</Link>
            </Button>

            {/* Hamburger - mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl"
          ref={menuRef}
        >
          <nav className="container mx-auto max-w-7xl px-4 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 py-3 mt-2 border-t border-border">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Digerr/cashclue-ai"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold"
            >
              <Link href="#wizard" onClick={() => setMenuOpen(false)}>
                {t.cta_getPlan}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
