
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartWidget } from "@/components/CartWidget";
import { NavigationBanner } from "@/components/NavigationBanner";
import Index from "./pages/Index";
import Tea from "./pages/Tea";
import Teaware from "./pages/Teaware";
import Sets from "./pages/Sets";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Ceremonies from "./pages/Ceremonies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isCartOrCheckout = ['/cart', '/checkout'].includes(location.pathname);

  return (
    <>
      <CartWidget />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/teaware" element={<Teaware />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/ceremonies" element={<Ceremonies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isCartOrCheckout && <NavigationBanner />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
