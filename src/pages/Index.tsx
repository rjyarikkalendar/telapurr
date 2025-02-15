
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CeremonySection } from "@/components/CeremonySection";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";

const Index = () => {
  const { currentLang, setLanguage, t } = useLanguage();

  return (
    <main className="min-h-screen bg-tea-bg">
      <LanguageSelector currentLang={currentLang} onLanguageChange={setLanguage} />
      <CartWidget />
      <HeroSection t={t} />
      <CategorySection t={t} />
      <CeremonySection t={t} />
    </main>
  );
};

export default Index;
