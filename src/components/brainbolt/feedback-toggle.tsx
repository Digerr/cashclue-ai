'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useFeedback } from '@/hooks/use-feedback';

export function FeedbackToggle() {
  const { toggle, isEnabled, trigger } = useFeedback();
  const [on, setOn] = useState(true);

  useEffect(() => { setOn(isEnabled()); }, [isEnabled]);

  return (
    <button
      onClick={() => { const n = toggle(); setOn(n); if (n) trigger('tap'); }}
      className="fixed bottom-3 right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border press"
      aria-label="Toggle feedback"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}
