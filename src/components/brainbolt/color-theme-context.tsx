'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ThemeId = 'emerald' | 'cyber' | 'sunset' | 'mono' | 'royal';
export type Mode = 'dark' | 'light';

export const THEMES: { id: ThemeId; label: string; swatch: string[] }[] = [
  { id: 'emerald', label: 'Emerald', swatch: ['#00e676', '#ffd60a', '#0c0f14'] },
  { id: 'cyber', label: 'Cyber', swatch: ['#e84393', '#00cec9', '#0a0a14'] },
  { id: 'sunset', label: 'Sunset', swatch: ['#ff6b35', '#fdcb6e', '#0d0a08'] },
  { id: 'mono', label: 'Mono', swatch: ['#ffffff', '#999', '#0a0a0a'] },
  { id: 'royal', label: 'Royal', swatch: ['#a855f7', '#ffd60a', '#0a0814'] },
];

const DEFAULT_THEME: ThemeId = 'emerald';
const DEFAULT_MODE: Mode = 'dark';
const THEME_KEY = 'brainbolt:theme';
const MODE_KEY = 'brainbolt:mode';

interface ThemeCtx {
  theme: ThemeId;
  mode: Mode;
  setTheme: (t: ThemeId) => void;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
}

const Ctx = createContext<ThemeCtx>({
  theme: DEFAULT_THEME,
  mode: DEFAULT_MODE,
  setTheme: () => {},
  setMode: () => {},
  toggleMode: () => {},
});

function applyTheme(t: ThemeId, m: Mode) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.setAttribute('data-mode', m);
}

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedTheme = localStorage.getItem(THEME_KEY) as ThemeId | null;
      const storedMode = localStorage.getItem(MODE_KEY) as Mode | null;
      const t = storedTheme && THEMES.some(x => x.id === storedTheme) ? storedTheme : DEFAULT_THEME;
      const m = storedMode === 'light' || storedMode === 'dark' ? storedMode : DEFAULT_MODE;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(t);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModeState(m);
      applyTheme(t, m);
    } catch {
      applyTheme(DEFAULT_THEME, DEFAULT_MODE);
    }
  }, []);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    applyTheme(t, mode);
    if (typeof window !== 'undefined') localStorage.setItem(THEME_KEY, t);
  }, [mode]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    applyTheme(theme, m);
    if (typeof window !== 'undefined') localStorage.setItem(MODE_KEY, m);
  }, [theme]);

  const toggleMode = useCallback(() => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setModeState(newMode);
    applyTheme(theme, newMode);
    if (typeof window !== 'undefined') localStorage.setItem(MODE_KEY, newMode);
  }, [mode, theme]);

  return (
    <Ctx.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </Ctx.Provider>
  );
}

export function useColorTheme(): ThemeCtx {
  return useContext(Ctx);
}
