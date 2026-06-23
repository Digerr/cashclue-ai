'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useLang } from './language-context';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--emerald-glow)]">
              <Zap className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="font-bold text-sm">BrainBolt</span>
          </Link>
          <nav className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/categories" className="hover:text-foreground">{t.nav_quizzes}</Link>
            <Link href="/leaderboard" className="hover:text-foreground">{t.nav_leaderboard}</Link>
            <Link href="/achievements" className="hover:text-foreground">Awards</Link>
            <Link href="/profile" className="hover:text-foreground">Profile</Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            by <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" className="font-bold text-[var(--emerald-glow)] hover:underline">SKUFI4</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
