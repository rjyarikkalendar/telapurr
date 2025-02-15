
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/");
    });
  }, [navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "Успешно",
        description: "Проверьте вашу почту для подтверждения регистрации",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      if (error) throw error;
      toast({
        title: "Код отправлен",
        description: "Проверьте ваш телефон",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'facebook') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tea-bg p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Вход в аккаунт</h2>
          <p className="mt-2 text-gray-600">
            Выберите удобный способ авторизации
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
            >
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('twitter')}
              disabled={loading}
            >
              Twitter
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Или продолжить с
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsPhoneLogin(!isPhoneLogin)}
          >
            <Phone className="mr-2 h-4 w-4" />
            {isPhoneLogin ? "Войти по email" : "Войти по телефону"}
          </Button>

          {isPhoneLogin ? (
            <form onSubmit={handlePhoneSignIn} className="space-y-4">
              <div>
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7XXXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Получить код
              </Button>
            </form>
          ) : (
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Войти
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleEmailSignUp}
                disabled={loading}
              >
                Зарегистрироваться
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
