
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('ru');

  useEffect(() => {
    const detectLanguage = () => {
      const storedLang = localStorage.getItem('preferred-language') as Language;
      if (storedLang && Object.keys(translations).includes(storedLang)) {
        return storedLang;
      }

      const browserLang = navigator.language.split('-')[0] as Language;
      return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
    };

    setCurrentLang(detectLanguage());
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('preferred-language', lang);
    setCurrentLang(lang);
  };

  const value = {
    currentLang,
    setLanguage,
    t: translations[currentLang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
