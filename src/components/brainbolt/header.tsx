'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Menu, X, Trophy, Grid3x3, Award, User } from 'lucide-react';
import { useLang } from './language-context';
import { LanguageSwitcher } from './language-switcher';
import { ColorThemeSwitcher } from './color-theme-switcher';

export function Header() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => setProfile(d.user)).catch(() => {});
  }, [pathname]); // refresh on page change

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
    { href: '/achievements', label: 'Awards', icon: Award },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--emerald-glow)]">
                <Zap className="h-4 w-4 text-black" />
              </div>
              <span className="font-bold text-base hidden sm:block">BrainBolt</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors rounded-md ${
                      active ? 'text-foreground bg-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              {/* XP/Level indicator */}
              {profile && profile.totalQuizzes > 0 && (
                <Link href="/profile" className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md border border-border text-xs hover:bg-accent transition-colors">
                  <span className="text-[var(--gold)] font-bold">Lv {profile.level}</span>
                  <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--emerald-glow)]" style={{ width: `${(profile.levelProgress || 0) * 100}%` }} />
                  </div>
                </Link>
              )}
              <div className="hidden md:block">
                <ColorThemeSwitcher />
              </div>
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-background" onClick={() => setMenuOpen(false)}>
          <nav className="flex flex-col p-4 gap-1" onClick={(e) => e.stopPropagation()}>
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-lg">Home</Link>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-lg">
                  <Icon className="h-5 w-5" /> {item.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 px-4 py-3 mt-2 border-t border-border">
              <ColorThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
