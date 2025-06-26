
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { CountrySelect } from "./CountrySelect";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  required = false
}) => {
  const [dialCode, setDialCode] = useState('+7');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Разбираем входящее значение на код страны и номер
  useEffect(() => {
    if (value) {
      // Ищем код страны в начале номера (может быть от 1 до 4 цифр после +)
      const match = value.match(/^(\+\d{1,4})\s*(.*)$/);
      if (match) {
        setDialCode(match[1]);
        setPhoneNumber(match[2].replace(/\D/g, ''));
      } else {
        // Если не найден код страны, считаем что это только номер
        setPhoneNumber(value.replace(/\D/g, ''));
      }
    } else {
      setPhoneNumber('');
    }
  }, [value]);

  const handleDialCodeChange = (newDialCode: string) => {
    setDialCode(newDialCode);
    const fullPhone = phoneNumber ? `${newDialCode} ${phoneNumber}` : newDialCode;
    onChange(fullPhone);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Удаляем все нецифровые символы
    const numbersOnly = inputValue.replace(/\D/g, '');
    
    setPhoneNumber(numbersOnly);
    
    // Формируем полный номер
    const fullPhone = numbersOnly ? `${dialCode} ${numbersOnly}` : dialCode;
    onChange(fullPhone);
  };

  const formatPhoneNumber = (number: string) => {
    // Простое форматирование: добавляем пробелы каждые 3-4 цифры
    if (!number) return '';
    
    const cleaned = number.replace(/\D/g, '');
    
    // Для российских номеров (10 цифр)
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    }
    
    // Для других номеров - группируем по 3-4 цифры
    if (cleaned.length > 6) {
      return cleaned.replace(/(\d{3})(\d{3})(.*)/, '$1 $2 $3');
    } else if (cleaned.length > 3) {
      return cleaned.replace(/(\d{3})(.*)/, '$1 $2');
    }
    
    return cleaned;
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <CountrySelect
        value={dialCode}
        onChange={handleDialCodeChange}
      />
      <Input
        type="tel"
        value={formatPhoneNumber(phoneNumber)}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder || "XXX XXX XX XX"}
        className="flex-1"
        required={required}
      />
    </div>
  );
};
