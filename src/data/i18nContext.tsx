import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from '../types';
import enData from './locales_en.json';
import esData from './locales_es.json';
import arData from './locales_ar.json';

interface I18nContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (path: string, fallback?: string) => string;
  isRTL: boolean;
}

const dictionaries: Record<Locale, Record<string, unknown>> = {
  en: enData as Record<string, unknown>,
  es: esData as Record<string, unknown>,
  ar: arData as Record<string, unknown>,
};

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (path: string) => path,
  isRTL: false,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
    if (newLoc === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = newLoc === 'es' ? 'es' : 'en';
    }
  };

  useEffect(() => {
    // Initial dir
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = (path: string, fallback?: string): string => {
    const dict = dictionaries[locale] || dictionaries.en;
    const parts = path.split('.');
    let cur: unknown = dict;

    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        // Fallback to English
        let enCur: unknown = dictionaries.en;
        for (const ep of parts) {
          if (enCur && typeof enCur === 'object' && ep in (enCur as Record<string, unknown>)) {
            enCur = (enCur as Record<string, unknown>)[ep];
          } else {
            return fallback || path;
          }
        }
        return typeof enCur === 'string' ? enCur : fallback || path;
      }
    }

    return typeof cur === 'string' ? cur : fallback || path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL: locale === 'ar' }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
