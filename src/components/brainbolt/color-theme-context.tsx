'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ThemeId = 'emerald' | 'cyber' | 'sunset' | 'mono' | 'royal';

export const THEMES: { id: ThemeId; label: string; swatch: string[] }[] = [
  { id: 'emerald', label: 'Emerald Gold', swatch: ['#34d399', '#fbbf24', '#0a1410'] },
  { id: 'cyber', label: 'Cyberpunk', swatch: ['#ec4899', '#22d3ee', '#1a0a2e'] },
  { id: 'sunset', label: 'Sunset', swatch: ['#fb923c', '#a855f7', '#2a0f1a'] },
  { id: 'mono', label: 'Monolith', swatch: ['#ffffff', '#888888', '#0a0a0a'] },
  { id: 'royal', label: 'Royal Purple', swatch: ['#a855f7', '#fbbf24', '#1a0a2e'] },
];

const DEFAULT_THEME: ThemeId = 'emerald';
const STORAGE_KEY = 'brainbolt:theme';

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  // On client mount: read theme from localStorage and apply to <html>.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      const t = stored && THEMES.some((x) => x.id === stored) ? stored : DEFAULT_THEME;
      document.documentElement.setAttribute('data-theme', t);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(t);
    } catch {
      document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
    }
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, t);
    }
  }, []);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useColorTheme(): ThemeCtx {
  return useContext(Ctx);
}

