'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[var(--emerald-glow)] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg animated-gradient">
                <Sparkles className="h-5 w-5 text-black" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">
                CashClue<span className="text-[var(--gold)]"> AI</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Side-Hustle Strategist
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="#how"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#examples"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
            </Link>
            <Link
              href="#pricing"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <Button
              asChild
              size="sm"
              className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold"
            >
              <Link href="#wizard">Get my plan</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
