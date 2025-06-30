
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";
import { PartnershipButton } from "@/components/PartnershipButton";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <CartWidget />
      <main className="flex-grow">
        <HeroSection t={t} />
        <CategorySection t={t} />
        <PartnershipButton />
      </main>
    </div>
  );
};

export default Index;
