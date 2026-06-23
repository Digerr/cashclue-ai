'use client';

import Link from 'next/link';
import { useFeedback } from '@/hooks/use-feedback';

export function Footer() {
  const { trigger } = useFeedback();
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">⚡ BrainBolt</span>
        <nav className="flex gap-3 text-[10px] text-muted-foreground">
          <Link href="/categories" onClick={() => trigger('tap')} className="hover:text-foreground">Quizzes</Link>
          <Link href="/leaderboard" onClick={() => trigger('tap')} className="hover:text-foreground">Ranks</Link>
          <Link href="/achievements" onClick={() => trigger('tap')} className="hover:text-foreground">Awards</Link>
        </nav>
        <span className="text-[10px] text-muted-foreground">by <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" className="font-bold text-primary">SKUFI4</a></span>
      </div>
    </footer>
  );
}
