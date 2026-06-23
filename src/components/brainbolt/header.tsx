'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Github, Twitter, Menu, X, Home, Trophy, Target, Award, Grid3x3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from './language-context';
import { LanguageSwitcher } from './language-switcher';
import { ColorThemeSwitcher } from './color-theme-switcher';

export function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { href: '/categories', label: t.nav_quizzes, icon: Grid3x3 },
    { href: '/leaderboard', label: t.nav_leaderboard, icon: Trophy },
    { href: '/achievements', label: 'Achievements', icon: Award },
    { href: '/profile', label: 'Profile', icon: Target },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[var(--emerald-glow)] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg animated-gradient">
                <Zap className="h-5 w-5 text-black" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                Brain<span className="text-[var(--gold)]">Bolt</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
                Quiz · XP · Streaks
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors rounded-md ${
                    active ? 'text-foreground bg-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ColorThemeSwitcher />
            <LanguageSwitcher />
            <Button asChild size="sm" className="hidden sm:flex bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
              <Link href="/categories">{t.cta_play}</Link>
            </Button>

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

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto max-w-7xl px-4 py-6 flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
              <Home className="h-5 w-5" /> Home
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
                  <Icon className="h-5 w-5" /> {item.label}
                </Link>
              );
            })}
            <Button asChild size="lg" className="mt-4 bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
              <Link href="/categories" onClick={() => setMenuOpen(false)}>{t.cta_play}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
