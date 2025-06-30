
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";
import { PartnershipButton } from "@/components/PartnershipButton";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <CartWidget />
      <main className="flex-grow">
        <HeroSection t={t} />
        <CategorySection t={t} />
        <PartnershipButton />
        
        {/* Legal Links Section */}
        <section className="bg-gray-50 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link 
                to="/terms-of-service" 
                className="text-tea-text hover:text-tea-brown transition-colors underline"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-tea-text hover:text-tea-brown transition-colors underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/refund-policy" 
                className="text-tea-text hover:text-tea-brown transition-colors underline"
              >
                Refund Policy
              </Link>
            </div>
            <div className="text-center mt-4 text-xs text-gray-600">
              © 2024 Tea Ceremony. All rights reserved.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
