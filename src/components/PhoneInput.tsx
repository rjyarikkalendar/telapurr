
import React from 'react';
import InputMask from 'react-input-mask';
import { Input } from "@/components/ui/input";
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
  placeholder = "+7 (999) 999-99-99",
  className,
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={handleChange}
      maskChar="_"
    >
      {(inputProps: any) => (
        <Input
          {...inputProps}
          type="tel"
          placeholder={placeholder}
          className={cn(className)}
          required={required}
        />
      )}
    </InputMask>
  );
};
