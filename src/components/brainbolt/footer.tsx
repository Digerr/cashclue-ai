'use client';

import Link from 'next/link';
import { useFeedback } from '@/hooks/use-feedback';
import { useLang } from './language-context';
import { ui } from '@/lib/ui-strings';

export function Footer() {
  const { trigger } = useFeedback();
  const { t, lang } = useLang();

  return (
    <footer className="border-t border-border mt-auto bg-card/30">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">⚡ BrainBolt</span>
        <nav className="flex gap-4 text-[10px] text-muted-foreground">
          <Link href="/categories" onClick={() => trigger('tap')} className="hover:text-foreground">{t.nav_quizzes}</Link>
          <Link href="/leaderboard" onClick={() => trigger('tap')} className="hover:text-foreground">{ui(lang, 'ranks')}</Link>
          <Link href="/achievements" onClick={() => trigger('tap')} className="hover:text-foreground">{ui(lang, 'awards')}</Link>
        </nav>
        <span className="text-[10px] text-muted-foreground">by <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" className="font-bold text-primary">SKUFI4</a></span>
      </div>
    </footer>
  );
}
