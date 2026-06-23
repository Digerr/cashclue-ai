'use client';

import { Header } from '@/components/brainbolt/header';
import { Footer } from '@/components/brainbolt/footer';
import { SoundToggle } from '@/components/brainbolt/sound-toggle';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SoundToggle />
    </div>
  );
}
