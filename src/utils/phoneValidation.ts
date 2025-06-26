
// Утилиты для валидации телефона
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Телефон не обязательный
  
  // Удаляем все символы кроме цифр
  const digits = phone.replace(/\D/g, '');
  
  // Проверяем российский номер: должен начинаться с 7 и содержать 11 цифр
  return digits.length === 11 && digits.startsWith('7');
};

export const formatPhoneForStorage = (phone: string): string => {
  // Очищаем телефон от маски для хранения
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 ? `+${digits}` : phone;
};

export const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return '';
  
  // Если телефон уже отформатирован, возвращаем как есть
  if (phone.includes('(')) return phone;
  
  // Форматируем для отображения
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('7')) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  }
  
  return phone;
};

export const getPhoneValidationMessage = (phone: string): string | null => {
  if (!phone) return null;
  
  const isValid = validatePhone(phone);
  return isValid ? null : 'Введите корректный российский номер телефона';
};
