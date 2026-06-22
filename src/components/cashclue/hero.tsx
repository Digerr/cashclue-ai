'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[var(--emerald-glow)]/20 blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs sm:text-sm text-muted-foreground mb-6 float-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--emerald-glow)] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--emerald-glow)]" />
            </span>
            New: AI-generated roadmaps now include 2026 market data
          </div>

          <h1 className="float-up text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Turn your skills <br className="hidden sm:block" />
            into{' '}
            <span className="shimmer-text">cold hard cash.</span>
          </h1>

          <p
            className="float-up mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: '0.1s' }}
          >
            CashClue AI reads your skills, time, budget, and goals — then builds you a personalized
            money-making playbook with real numbers, real steps, and real income projections. No
            hustle-bro fluff. Just a plan you can start today.
          </p>

          <div
            className="float-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ animationDelay: '0.2s' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold text-base h-12 px-8 pulse-glow"
            >
              <Link href="#wizard" className="flex items-center gap-2">
                Generate my plan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold text-base h-12 px-8 border-border bg-card/40 backdrop-blur"
            >
              <Link href="#examples">See examples</Link>
            </Button>
          </div>

          <div
            className="float-up mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--emerald-glow)]" />
              <span><strong className="text-foreground">12,847</strong> plans generated</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[var(--gold)]" />
              <span><strong className="text-foreground">$2.3M+</strong> projected income</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[var(--emerald-glow)]" />
              <span><strong className="text-foreground">4.9/5</strong> avg rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
