'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-400 mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Something broke</h1>
        <p className="text-muted-foreground mb-6">
          The AI had a hiccup. Try again — if it keeps happening, refresh the page.
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={reset} className="bg-[var(--emerald-glow)] text-black hover:bg-[var(--emerald-glow)]/90 font-semibold">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
