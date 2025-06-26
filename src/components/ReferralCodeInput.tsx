
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReferralCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const ReferralCodeInput: React.FC<ReferralCodeInputProps> = ({
  value,
  onChange,
  placeholder = "Введите реферальный код (необязательно)",
  label = "Реферальный код"
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="referral_code">{label}</Label>
      <Input
        id="referral_code"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder={placeholder}
        className="uppercase"
      />
      <p className="text-sm text-gray-500">
        Если у вас есть реферальный код от друга, введите его здесь
      </p>
    </div>
  );
};
