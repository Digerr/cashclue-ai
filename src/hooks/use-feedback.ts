'use client';

import { useCallback, useRef, useEffect } from 'react';

/**
 * Haptic + sound feedback system.
 * - Mobile: navigator.vibrate() for haptic feedback
 * - Desktop: subtle Web Audio click
 * - All interactions feel tactile and responsive
 */

type FeedbackType = 'tap' | 'select' | 'success' | 'error' | 'tick' | 'complete';

const VIBRATION_PATTERNS: Record<FeedbackType, number | number[]> = {
  tap: 10,           // tiny tap
  select: 15,        // slightly stronger
  success: [10, 30, 10],  // double tap
  error: [30, 50, 30],    // buzz
  tick: 5,           // minimal
  complete: [10, 40, 10, 40, 20],  // victory pattern
};

export function useFeedback() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('brainbolt:feedback');
      enabledRef.current = stored !== 'false';
    } catch {}
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AC();
      } catch { return null; }
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.04) => {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  }, [getCtx]);

  const trigger = useCallback((type: FeedbackType = 'tap') => {
    if (!enabledRef.current) return;

    // Haptic (mobile)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(VIBRATION_PATTERNS[type]); } catch {}
    }

    // Sound (all devices, very subtle)
    switch (type) {
      case 'tap':
        playTone(600, 0.03, 'sine', 0.03);
        break;
      case 'select':
        playTone(800, 0.04, 'sine', 0.04);
        break;
      case 'success':
        playTone(659, 0.06, 'sine', 0.05);
        setTimeout(() => playTone(880, 0.08, 'sine', 0.05), 60);
        break;
      case 'error':
        playTone(200, 0.12, 'sawtooth', 0.06);
        break;
      case 'tick':
        playTone(1200, 0.02, 'square', 0.02);
        break;
      case 'complete':
        playTone(523, 0.08, 'sine', 0.05);
        setTimeout(() => playTone(659, 0.08, 'sine', 0.05), 80);
        setTimeout(() => playTone(784, 0.08, 'sine', 0.05), 160);
        setTimeout(() => playTone(1047, 0.2, 'sine', 0.06), 240);
        break;
    }
  }, [playTone]);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    try { localStorage.setItem('brainbolt:feedback', String(enabledRef.current)); } catch {}
    return enabledRef.current;
  }, []);

  return { trigger, toggle, isEnabled: () => enabledRef.current };
}
