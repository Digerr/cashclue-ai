'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg animated-gradient">
                <Sparkles className="h-4 w-4 text-black" />
              </div>
              <span className="text-lg font-bold">
                CashClue<span className="text-[var(--gold)]"> AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The AI side-hustle strategist that turns your skills into a real money-making plan.
              Built for solopreneurs, side-hustlers, and anyone who&apos;d rather build than scroll.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#wizard" className="hover:text-foreground transition-colors">Generator</Link></li>
              <li><Link href="#how" className="hover:text-foreground transition-colors">How it works</Link></li>
              <li><Link href="#examples" className="hover:text-foreground transition-colors">Examples</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CashClue AI. Built for builders.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with grit, caffeine, and an unhealthy obsession with side hustles.
          </p>
        </div>
      </div>
    </footer>
  );
}
