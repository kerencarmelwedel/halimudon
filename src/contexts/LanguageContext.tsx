import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  dir: () => 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  return useContext(LanguageContext) as LanguageContextType;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const dir = (): 'ltr' | 'rtl' => {
    return language === 'he' ? 'rtl' : 'ltr';
  };

  const value = {
    language,
    setLanguage,
    t,
    dir,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
} 