
// Утилиты для валидации телефона
export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Телефон не обязательный
  
  // Удаляем все символы кроме цифр и плюса
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Проверяем что номер начинается с + и содержит от 8 до 15 цифр
  const phoneRegex = /^\+\d{7,14}$/;
  return phoneRegex.test(cleaned);
};

export const formatPhoneForStorage = (phone: string): string => {
  if (!phone) return '';
  
  // Очищаем телефон от всех символов кроме цифр и плюса
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Если номер не начинается с +, добавляем его
  if (cleaned && !cleaned.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  return cleaned;
};

export const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return '';
  
  // Если телефон уже отформатирован (содержит пробелы), возвращаем как есть
  if (phone.includes(' ') && phone.startsWith('+')) return phone;
  
  const cleaned = formatPhoneForStorage(phone);
  
  // Разбиваем на код страны и номер
  const match = cleaned.match(/^(\+\d{1,4})(\d+)$/);
  if (match) {
    const [, dialCode, number] = match;
    return `${dialCode} ${number}`;
  }
  
  return phone;
};

export const getPhoneValidationMessage = (phone: string): string | null => {
  if (!phone) return null;
  
  const isValid = validatePhone(phone);
  if (!isValid) {
    return 'Введите корректный номер телефона в международном формате';
  }
  
  return null;
};

// Проверка на российский номер (для специфичной валидации если нужно)
export const isRussianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('7');
};
