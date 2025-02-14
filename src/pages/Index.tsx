
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CeremonySection } from "@/components/CeremonySection";

const Index = () => {
  return (
    <main className="min-h-screen bg-tea-bg">
      <HeroSection />
      <CategorySection />
      <CeremonySection />
    </main>
  );
};

export default Index;
