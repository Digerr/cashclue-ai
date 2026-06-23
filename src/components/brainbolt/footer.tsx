'use client';

import Link from 'next/link';
import { useFeedback } from '@/hooks/use-feedback';
import { useLang } from './language-context';

export function Footer() {
  const { trigger } = useFeedback();
  const { t } = useLang();

  return (
    <footer className="border-t border-border mt-auto bg-card/30">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Top row: brand + tagline */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">⚡</span>
              <span className="font-bold text-sm">BrainBolt</span>
            </div>
            <p className="text-[10px] text-muted-foreground max-w-xs">{t.footer_tagline}</p>
          </div>
          {/* Social */}
          <div className="flex gap-2">
            <a href="https://t.me/Brain_Boltbot" target="_blank" rel="noreferrer" onClick={() => trigger('tap')} className="flex h-8 w-8 items-center justify-center rounded-lg bg-card border border-border press hover:border-primary/30 text-sm">
              ✈️
            </a>
            <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" onClick={() => trigger('tap')} className="flex h-8 w-8 items-center justify-center rounded-lg bg-card border border-border press hover:border-primary/30 text-sm">
              🐙
            </a>
          </div>
        </div>

        {/* Nav row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 pb-4 border-b border-border">
          <Link href="/categories" onClick={() => trigger('tap')} className="text-xs text-muted-foreground hover:text-primary press">🎮 Quizzes</Link>
          <Link href="/leaderboard" onClick={() => trigger('tap')} className="text-xs text-muted-foreground hover:text-primary press">🏆 Leaderboard</Link>
          <Link href="/achievements" onClick={() => trigger('tap')} className="text-xs text-muted-foreground hover:text-primary press">🎖 Achievements</Link>
          <Link href="/profile" onClick={() => trigger('tap')} className="text-xs text-muted-foreground hover:text-primary press">👤 Profile</Link>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} BrainBolt · by{' '}
            <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" className="font-bold text-primary">SKUFI4</a> 🛠
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">v5.0 · 30 quizzes · 300Q</span>
        </div>
      </div>
    </footer>
  );
}
