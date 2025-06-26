
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
  { code: 'RU', name: 'Россия', dialCode: '+7', flag: '🇷🇺' },
  { code: 'KZ', name: 'Казахстан', dialCode: '+7', flag: '🇰🇿' },
  { code: 'US', name: 'США', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'Великобритания', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Германия', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'Франция', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Италия', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Испания', dialCode: '+34', flag: '🇪🇸' },
  { code: 'UA', name: 'Украина', dialCode: '+380', flag: '🇺🇦' },
  { code: 'BY', name: 'Беларусь', dialCode: '+375', flag: '🇧🇾' },
  { code: 'PL', name: 'Польша', dialCode: '+48', flag: '🇵🇱' },
  { code: 'TR', name: 'Турция', dialCode: '+90', flag: '🇹🇷' },
  { code: 'CN', name: 'Китай', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Япония', dialCode: '+81', flag: '🇯🇵' },
  { code: 'IN', name: 'Индия', dialCode: '+91', flag: '🇮🇳' },
];

interface CountrySelectProps {
  value: string;
  onChange: (dialCode: string) => void;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className
}) => {
  const selectedCountry = countries.find(country => country.dialCode === value) || countries[0];

  return (
    <Select value={selectedCountry.dialCode} onValueChange={onChange}>
      <SelectTrigger className={`w-[120px] ${className}`}>
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.dialCode}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={`${country.code}-${country.dialCode}`} value={country.dialCode}>
            <span className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.dialCode}</span>
              <span className="text-sm text-gray-600">{country.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
