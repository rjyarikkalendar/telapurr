
import { Button } from "@/components/ui/button";
import { languages, Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector = ({ currentLang, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {Object.entries(languages).map(([code, name]) => (
        <Button
          key={code}
          variant={currentLang === code ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(code as Language)}
          className="flex items-center gap-2"
        >
          {code === currentLang && <Globe className="h-4 w-4" />}
          {name}
        </Button>
      ))}
    </div>
  );
};
