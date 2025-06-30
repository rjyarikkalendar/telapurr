import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartWidget } from "@/components/CartWidget";
import { NavigationBanner } from "@/components/NavigationBanner";
import { LanguageSelector } from "@/components/LanguageSelector";
import { BrandLogo } from "@/components/BrandLogo";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useLanguage, LanguageProvider } from "@/hooks/use-language";
import { AuthButton } from "@/components/AuthButton";
import { AuthProvider } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import Index from "./pages/Index";
import Tea from "./pages/Tea";
import Teaware from "./pages/Teaware";
import Sets from "./pages/Sets";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Partnership from "./pages/Partnership";
import Profile from "./pages/Profile";
import Profiles from "./pages/Profiles";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isCartOrCheckout = ['/cart', '/checkout'].includes(location.pathname);
  const isAuth = location.pathname === '/auth';
  const { currentLang, setLanguage } = useLanguage();

  return (
    <>
      {!isAuth && (
        <>
          <BrandLogo />
          <CartWidget />
          <ScrollToTopButton />
          <AuthButton />
          <LanguageSelector currentLang={currentLang} onLanguageChange={setLanguage} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/teaware" element={<Teaware />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isCartOrCheckout && !isAuth && <NavigationBanner />}
      
      {/* Legal Links Footer - now truly at the bottom */}
      {!isAuth && (
        <footer className="bg-gray-50 py-8">
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
              © 2025 TEPURRFECT. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-left" />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
