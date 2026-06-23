'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLang } from './language-context';
import { LanguageSwitcher } from './language-switcher';
import { ColorThemeSwitcher } from './color-theme-switcher';
import { useFeedback } from '@/hooks/use-feedback';

export function Header() {
  const { t } = useLang();
  const { trigger } = useFeedback();
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
    { href: '/categories', label: t.nav_quizzes },
    { href: '/leaderboard', label: t.nav_leaderboard },
    { href: '/achievements', label: 'Awards' },
    { href: '/profile', label: 'Profile' },
  ];

  const handleNav = () => {
    trigger('tap');
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="mx-auto max-w-5xl px-4 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={() => trigger('tap')} className="font-mono font-bold text-sm tracking-tight press">
            ⚡ BrainBolt
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => trigger('tap')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors rounded press ${
                    active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="ml-2 flex items-center gap-1">
              <ColorThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => { trigger('tap'); setMenuOpen(!menuOpen); }}
            className="md:hidden flex h-9 w-9 items-center justify-center tap"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-12 z-40 bg-background animate-fade-in" onClick={() => setMenuOpen(false)}>
          <nav className="flex flex-col p-4 gap-1" onClick={(e) => e.stopPropagation()}>
            <Link href="/" onClick={handleNav} className="px-4 py-3.5 text-base font-medium press rounded">Home</Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={handleNav} className="px-4 py-3.5 text-base font-medium press rounded">
                {item.label}
              </Link>
            ))}
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
