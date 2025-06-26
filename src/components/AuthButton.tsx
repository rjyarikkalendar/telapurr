
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export const AuthButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { t } = useLanguage();

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
    <div className="absolute top-4 right-[100px] z-50">
      {user ? (
        <div className="flex gap-2">
          <Button onClick={() => navigate('/profile')} variant="outline">
            {t.profile.title}
          </Button>
          <Button onClick={handleSignOut}>{t.nav.logout}</Button>
        </div>
      ) : (
        <Button onClick={() => navigate('/auth')}>{t.nav.login}</Button>
      )}
    </div>
  );
};
