'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';

export function SoundToggle() {
  const { toggle, isEnabled } = useSound();
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isEnabled());
  }, [isEnabled]);

  return (
    <button
      onClick={() => { const n = toggle(); setOn(n); }}
      className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur shadow-lg text-foreground hover:bg-accent transition-colors"
      aria-label="Toggle sound"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
