'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { DICT, Dict, Lang, DEFAULT_LANG, loadLang, saveLang } from '@/lib/i18n';

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({
  lang: DEFAULT_LANG,
  t: DICT[DEFAULT_LANG],
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Lazy init from localStorage / browser lang — runs once on client first render
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    return loadLang();
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    saveLang(l);
  }, []);

  return (
    <Ctx.Provider value={{ lang, t: DICT[lang] ?? DICT[DEFAULT_LANG], setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang(): LangCtx {
  return useContext(Ctx);
}
