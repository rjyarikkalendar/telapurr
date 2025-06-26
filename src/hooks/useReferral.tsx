
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useReferral = () => {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setReferralCode(refParam);
      // Сохраняем в localStorage на случай если пользователь перейдет на другие страницы
      localStorage.setItem('referralCode', refParam);
    } else {
      // Проверяем есть ли сохраненный код
      const savedCode = localStorage.getItem('referralCode');
      if (savedCode) {
        setReferralCode(savedCode);
      }
    }
  }, [searchParams]);

  const clearReferralCode = () => {
    setReferralCode(null);
    localStorage.removeItem('referralCode');
  };

  return {
    referralCode,
    clearReferralCode
  };
};
