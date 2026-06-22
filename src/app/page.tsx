import { Header } from '@/components/cashclue/header';
import { Hero } from '@/components/cashclue/hero';
import { Wizard } from '@/components/cashclue/wizard';
import { HowItWorks } from '@/components/cashclue/how-it-works';
import { Examples } from '@/components/cashclue/examples';
import { Pricing } from '@/components/cashclue/pricing';
import { Footer } from '@/components/cashclue/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Wizard />
        <HowItWorks />
        <Examples />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
