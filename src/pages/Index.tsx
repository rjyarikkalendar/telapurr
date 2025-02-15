
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CeremonySection } from "@/components/CeremonySection";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="flex flex-col min-h-screen bg-tea-bg">
      <CartWidget />
      <div className="absolute top-4 right-4 z-50">
        {user ? (
          <Button onClick={handleSignOut}>Выйти</Button>
        ) : (
          <Button onClick={() => navigate('/auth')}>Войти</Button>
        )}
      </div>
      <main className="flex-grow">
        <HeroSection t={t} />
        <CategorySection t={t} />
        <CeremonySection t={t} />
      </main>
    </div>
  );
};

export default Index;
