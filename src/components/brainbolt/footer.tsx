'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useLang } from './language-context';

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg animated-gradient"><Zap className="h-4 w-4 text-black" /></div>
              <span className="text-lg font-bold">Brain<span className="text-[var(--gold)]">Bolt</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">{t.footer_tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">{t.footer_product}</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href="/categories" className="hover:text-foreground transition-colors">{t.nav_quizzes}</Link></li>
              <li><Link href="/leaderboard" className="hover:text-foreground transition-colors">{t.nav_leaderboard}</Link></li>
              <li><Link href="/achievements" className="hover:text-foreground transition-colors">Achievements</Link></li>
              <li><Link href="/profile" className="hover:text-foreground transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">{t.footer_company}</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t.footer_about}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.footer_privacy}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t.footer_terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {t.footer_rights}</p>
          <p className="text-xs text-muted-foreground">
            Crafted by <a href="https://github.com/Digerr/cashclue-ai" target="_blank" rel="noreferrer" className="font-bold text-[var(--emerald-glow)] hover:underline">SKUFI4</a> 🛠
          </p>
        </div>
      </div>
    </footer>
  );
}
