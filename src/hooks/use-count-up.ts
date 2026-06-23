'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Animate a number from 0 to target over duration.
 * Uses requestAnimationFrame with easeOutExpo for smooth casino-style counting.
 */
export function useCountUp(target: number, duration: number = 1500, delay: number = 200): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (target === 0) { return; }

    const start = () => {
      startTimeRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutExpo — fast start, slow end (casino feel)
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setValue(Math.round(target * eased));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setValue(target); // ensure exact final value
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(start, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}
