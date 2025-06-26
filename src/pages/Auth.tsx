
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useReferral } from "@/hooks/useReferral";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { ReferralCodeInput } from "@/components/ReferralCodeInput";
import { useLanguage } from "@/hooks/use-language";

const Auth = () => {
  const { user, isEmailVerified, signIn, signUp, verifyEmail } = useAuth();
  const { referralCode, clearReferralCode } = useReferral();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inputReferralCode, setInputReferralCode] = useState("");

  useEffect(() => {
    // Проверяем наличие токена верификации в URL
    const verifyToken = searchParams.get('verify_email');
    if (verifyToken) {
      handleEmailVerification(verifyToken);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && isEmailVerified) {
      navigate("/");
    }
  }, [user, isEmailVerified, navigate]);

  useEffect(() => {
    if (referralCode) {
      setInputReferralCode(referralCode);
    }
  }, [referralCode]);

  const handleEmailVerification = async (token: string) => {
    try {
      const result = await verifyEmail(token);
      
      if (result.success) {
        toast({
          title: t.auth.emailVerified,
          description: t.auth.emailVerificationSuccess,
        });
        // Удаляем токен из URL
        navigate('/auth', { replace: true });
      } else {
        toast({
          title: t.auth.emailVerificationError,
          description: t.auth.invalidToken,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t.auth.emailVerificationError,
        description: t.auth.invalidToken,
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      
      // Проверяем верификацию email после входа
      if (isEmailVerified === false) {
        toast({
          title: t.auth.emailNotVerified,
          description: t.auth.checkEmailMessage,
          variant: "destructive",
        });
        return;
      }
      
      clearReferralCode();
      toast({
        title: t.auth.welcome,
        description: t.auth.successLogin,
      });
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: t.auth.loginError,
        description: error.message || t.auth.invalidCredentials,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, { 
        first_name: firstName, 
        last_name: lastName,
        referral_code: inputReferralCode || undefined
      });
      clearReferralCode();
      toast({
        title: t.auth.registrationSuccess,
        description: t.auth.checkEmailMessage,
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: t.auth.registrationError,
        description: error.message || t.auth.registrationErrorGeneric,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Авторизация</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Вход</TabsTrigger>
                <TabsTrigger value="signup">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signin-password">Пароль</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-tea-brown hover:bg-tea-brown/90" disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Имя</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Пароль</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <ReferralCodeInput
                    value={inputReferralCode}
                    onChange={setInputReferralCode}
                  />
                  <Button type="submit" className="w-full bg-tea-brown hover:bg-tea-brown/90" disabled={loading}>
                    {loading ? "Регистрируемся..." : "Зарегистрироваться"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
