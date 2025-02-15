
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { languages, Language } from "@/lib/i18n";

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector = ({ currentLang, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1">
      {Object.entries(languages).map(([code, name]) => (
        <Button
          key={code}
          variant={currentLang === code ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(code as Language)}
          className="w-12 h-8 text-sm flex items-center justify-center"
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
