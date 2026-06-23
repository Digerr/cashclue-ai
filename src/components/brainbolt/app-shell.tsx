'use client';

import { Header } from '@/components/brainbolt/header';
import { Footer } from '@/components/brainbolt/footer';
import { FeedbackToggle } from '@/components/brainbolt/feedback-toggle';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FeedbackToggle />
    </div>
  );
}
