'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl animated-gradient mb-6">
          <Sparkles className="h-8 w-8 text-black" />
        </div>
        <h1 className="text-6xl font-bold mb-3">404</h1>
        <p className="text-muted-foreground mb-6">
          This page wandered off looking for side hustles. Let&apos;s get you back to making money.
        </p>
        <Button asChild className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
