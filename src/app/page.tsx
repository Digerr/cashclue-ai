'use client';

import { useState } from 'react';
import { Header } from '@/components/cashclue/header';
import { Hero } from '@/components/cashclue/hero';
import { TrustBadges } from '@/components/cashclue/trust-badges';
import { ThemeShowcase } from '@/components/cashclue/theme-showcase';
import { Wizard } from '@/components/cashclue/wizard';
import { HowItWorks } from '@/components/cashclue/how-it-works';
import { Examples } from '@/components/cashclue/examples';
import { Pricing } from '@/components/cashclue/pricing';
import { Faq } from '@/components/cashclue/faq';
import { Footer } from '@/components/cashclue/footer';
import type { ThemeId } from '@/lib/ai';

export default function Home() {
  const [theme, setTheme] = useState<ThemeId>('sideHustle');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <ThemeShowcase selected={theme} onSelect={setTheme} />
        <Wizard initialTheme={theme} />
        <HowItWorks />
        <Examples />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
