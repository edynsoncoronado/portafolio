import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { es } from './es';
import { en } from './en';
import { isLanguage, type Dictionary, type Language } from './types';

const STORAGE_KEY = 'kerulab-lang';

const dictionaries: Record<Language, Dictionary> = { es, en };

export interface I18nValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

export const I18nContext = createContext<I18nValue | null>(null);

function resolveInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'es';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    // localStorage no disponible (modo privado o cookies bloqueadas).
  }

  const preferred = window.navigator.language?.toLowerCase() ?? 'es';
  return preferred.startsWith('es') ? 'es' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(resolveInitialLanguage);

  useEffect(() => {
    const dict = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = dict.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', dict.meta.description);
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // La preferencia no se persiste, pero la sesión actual sí cambia.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
