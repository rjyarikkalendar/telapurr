
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CeremonySection } from "@/components/CeremonySection";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";
import { NavigationBanner } from "@/components/NavigationBanner";

const Index = () => {
  const { currentLang, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <LanguageSelector currentLang={currentLang} onLanguageChange={setLanguage} />
      <CartWidget />
      <main className="flex-grow">
        <HeroSection t={t} />
        <CategorySection t={t} />
        <CeremonySection t={t} />
      </main>
      <div className="mt-20">
        <NavigationBanner />
      </div>
    </div>
  );
};

export default Index;
