'use client';

import { useCallback, useRef, useEffect } from 'react';

/**
 * Sound effects using Web Audio API — no audio files needed.
 * Generates beeps/chimes programmatically.
 */

type SoundType = 'correct' | 'wrong' | 'click' | 'complete' | 'levelup' | 'tick';

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('brainbolt:sound');
      enabledRef.current = stored !== 'false'; // enabled by default
    } catch {}
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      try {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AC();
      } catch {
        return null;
      }
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) => {
    if (!enabledRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;

    // Resume context if suspended (browsers require user gesture)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [getCtx]);

  const play = useCallback((sound: SoundType) => {
    if (!enabledRef.current) return;

    switch (sound) {
      case 'correct':
        // Quick rising chime: C5 -> E5 -> G5
        playTone(523.25, 0.1, 'sine', 0.12);
        setTimeout(() => playTone(659.25, 0.1, 'sine', 0.12), 80);
        setTimeout(() => playTone(783.99, 0.15, 'sine', 0.12), 160);
        break;
      case 'wrong':
        // Low buzz
        playTone(200, 0.2, 'sawtooth', 0.1);
        setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.1), 100);
        break;
      case 'click':
        playTone(800, 0.05, 'square', 0.05);
        break;
      case 'tick':
        playTone(1000, 0.03, 'square', 0.04);
        break;
      case 'complete':
        // Victory fanfare
        playTone(523.25, 0.15, 'sine', 0.15);
        setTimeout(() => playTone(659.25, 0.15, 'sine', 0.15), 150);
        setTimeout(() => playTone(783.99, 0.15, 'sine', 0.15), 300);
        setTimeout(() => playTone(1046.5, 0.3, 'sine', 0.15), 450);
        break;
      case 'levelup':
        // Big ascending chime
        playTone(523.25, 0.1, 'triangle', 0.15);
        setTimeout(() => playTone(659.25, 0.1, 'triangle', 0.15), 100);
        setTimeout(() => playTone(783.99, 0.1, 'triangle', 0.15), 200);
        setTimeout(() => playTone(1046.5, 0.1, 'triangle', 0.15), 300);
        setTimeout(() => playTone(1318.51, 0.4, 'triangle', 0.15), 400);
        break;
    }
  }, [playTone]);

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    if (typeof window !== 'undefined') {
      localStorage.setItem('brainbolt:sound', String(enabledRef.current));
    }
    return enabledRef.current;
  }, []);

  const isEnabled = useCallback(() => enabledRef.current, []);

  return { play, toggle, isEnabled };
}
