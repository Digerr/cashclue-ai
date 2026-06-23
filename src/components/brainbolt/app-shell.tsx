'use client';

import { useState } from 'react';
import { Header } from '@/components/brainbolt/header';
import { Footer } from '@/components/brainbolt/footer';
import { FeedbackToggle } from '@/components/brainbolt/feedback-toggle';
import { SplashScreen } from '@/components/brainbolt/splash-screen';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FeedbackToggle />
    </div>
  );
}
