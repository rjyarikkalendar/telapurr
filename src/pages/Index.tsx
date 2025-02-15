
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CeremonySection } from "@/components/CeremonySection";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <CartWidget />
      <main className="flex-grow">
        <HeroSection t={t} />
        <CategorySection t={t} />
        <CeremonySection t={t} />
      </main>
    </div>
  );
};

export default Index;
