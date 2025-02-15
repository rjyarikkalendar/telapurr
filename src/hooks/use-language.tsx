
import { useEffect, useState } from 'react';
import { Language, translations } from '@/lib/i18n';

export function useLanguage() {
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

  return {
    currentLang,
    setLanguage,
    t: translations[currentLang]
  };
}
