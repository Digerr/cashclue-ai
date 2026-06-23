'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useTelegram } from '@/hooks/use-telegram';

/**
 * Splash screen — shown on first load, especially beautiful in Telegram Mini App.
 * Shows brand logo, name, and developer credit with smooth animations.
 */
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { isTelegram } = useTelegram();
  const [phase, setPhase] = useState<'logo' | 'name' | 'credit' | 'done'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 500);
    const t2 = setTimeout(() => setPhase('credit'), 1100);
    const t3 = setTimeout(() => { setPhase('done'); onComplete(); }, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center animate-fade-in">
      {/* Logo */}
      <div className={`transition-all duration-500 ${phase === 'logo' ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow animate-glow-pulse">
          <Zap className="h-10 w-10" />
        </div>
      </div>

      {/* Name */}
      <div className={`mt-4 transition-all duration-500 ${phase === 'logo' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Brain<span className="text-primary">Bolt</span>
        </h1>
        <p className="text-xs text-muted-foreground text-center mt-1">Train your brain. Beat the board.</p>
      </div>

      {/* Credit */}
      <div className={`absolute bottom-8 transition-all duration-500 ${phase === 'credit' ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <p className="text-[10px] text-muted-foreground">
          by <span className="font-bold text-primary">SKUFI4</span> 🛠
        </p>
        {isTelegram && (
          <p className="text-[9px] text-muted-foreground/50 mt-1 text-center">⚡ Telegram Mini App</p>
        )}
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-20 w-32 h-0.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-progress" style={{ animationDuration: '1.2s' }} />
      </div>
    </div>
  );
}
