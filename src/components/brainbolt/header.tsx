'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { useLang } from './language-context';
import { LanguageSwitcher } from './language-switcher';
import { ColorThemeSwitcher } from './color-theme-switcher';
import { useFeedback } from '@/hooks/use-feedback';

export function Header() {
  const { t } = useLang();
  const { trigger } = useFeedback();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(d => setProfile(d.user)).catch(() => {});
  }, [pathname]);

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
    { href: '/categories', label: t.nav_quizzes },
    { href: '/leaderboard', label: t.nav_leaderboard },
    { href: '/achievements', label: 'Awards' },
  ];

  const handleNav = () => { trigger('tap'); setMenuOpen(false); };

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" onClick={() => trigger('tap')} className="flex items-center gap-2 press shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm hidden sm:block">BrainBolt</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => trigger('tap')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-lg press ${
                    active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            {/* XP bar — always visible */}
            {profile && profile.totalQuizzes > 0 ? (
              <Link href="/profile" onClick={() => trigger('tap')} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-card border border-border press">
                {/* Avatar */}
                <span className="text-base">{profile.avatar || '🎯'}</span>
                {/* Level + bar */}
                <div className="hidden sm:flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-primary leading-none">Lv {profile.level}</span>
                  <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(profile.levelProgress || 0) * 100}%` }} />
                  </div>
                </div>
                {/* Mobile: just level */}
                <span className="sm:hidden text-[10px] font-bold text-primary">Lv{profile.level}</span>
              </Link>
            ) : (
              <Link href="/profile" onClick={() => trigger('tap')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card border border-border press">
                <span className="text-base">🎯</span>
                <span className="text-[10px] font-bold text-muted-foreground hidden sm:block">New</span>
              </Link>
            )}
            <div className="hidden md:block">
              <ColorThemeSwitcher />
            </div>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => { trigger('tap'); setMenuOpen(!menuOpen); }}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg press"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-background animate-fade-in" onClick={() => setMenuOpen(false)}>
          <nav className="flex flex-col p-4 gap-1" onClick={(e) => e.stopPropagation()}>
            <Link href="/" onClick={handleNav} className="px-4 py-3.5 text-base font-medium press rounded-xl hover:bg-accent">🏠 Home</Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleNav} className="px-4 py-3.5 text-base font-medium press rounded-xl hover:bg-accent">
                {item.href === '/categories' ? '🎮 ' : item.href === '/leaderboard' ? '🏆 ' : '🎖 '}{item.label}
              </Link>
            ))}
            <Link href="/profile" onClick={handleNav} className="px-4 py-3.5 text-base font-medium press rounded-xl hover:bg-accent">👤 Profile</Link>
            <div className="flex items-center gap-3 px-4 py-3 mt-2 border-t border-border">
              <ColorThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
