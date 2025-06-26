import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { CartWidget } from "@/components/CartWidget";
import { useLanguage } from "@/hooks/use-language";
import { PartnershipButton } from "@/components/PartnershipButton";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@radix-ui/react-card";

const Index = () => {
  const { user, isEmailVerified, verifyEmail } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Проверяем наличие токена верификации в URL
    const verifyToken = searchParams.get('verify_email');
    if (verifyToken) {
      handleEmailVerification(verifyToken);
    }
  }, [searchParams]);

  const handleEmailVerification = async (token: string) => {
    try {
      const result = await verifyEmail(token);
      
      if (result.success) {
        toast({
          title: t.auth.emailVerified,
          description: t.auth.emailVerificationSuccess,
        });
      } else {
        toast({
          title: t.auth.emailVerificationError,
          description: t.auth.invalidToken,
          variant: "destructive",
        });
      }
      
      // Удаляем параметр из URL
      setSearchParams(prev => {
        prev.delete('verify_email');
        return prev;
      });
    } catch (error) {
      toast({
        title: t.auth.emailVerificationError,
        description: t.auth.invalidToken,
        variant: "destructive",
      });
      
      // Удаляем параметр из URL даже при ошибке
      setSearchParams(prev => {
        prev.delete('verify_email');
        return prev;
      });
    }
  };

  // Если пользователь залогинен но email не подтвержден
  if (user && isEmailVerified === false) {
    return (
      <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
        <main className="flex-grow flex items-center justify-center px-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-xl text-tea-text">
                {t.auth.emailNotVerified}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {t.auth.checkEmailMessage}
              </p>
              <Button 
                onClick={() => supabase.auth.signOut()}
                variant="outline"
                className="w-full"
              >
                Выйти
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

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
