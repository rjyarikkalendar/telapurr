
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: { first_name: string; last_name: string; referral_code?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: (email: string, firstName: string, lastName: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Устанавливаем слушатель изменений аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Проверяем статус верификации email
        if (session?.user) {
          await checkEmailVerification(session.user.id);
        } else {
          setIsEmailVerified(null);
        }
        
        setLoading(false);
      }
    );

    // Получаем текущую сессию
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkEmailVerification(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkEmailVerification = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email_verified')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking email verification:', error);
        setIsEmailVerified(false);
        return;
      }

      setIsEmailVerified(data?.email_verified || false);
    } catch (error) {
      console.error('Error checking email verification:', error);
      setIsEmailVerified(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData?: { first_name: string; last_name: string; referral_code?: string }
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: userData || {},
      },
    });
    if (error) throw error;

    // Отправляем email подтверждения
    if (userData?.first_name && userData?.last_name) {
      await sendVerificationEmail(email, userData.first_name, userData.last_name);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setIsEmailVerified(null);
  };

  const sendVerificationEmail = async (email: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-verification-email', {
        body: { email, firstName, lastName }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  };

  const verifyEmail = async (token: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-email', {
        body: { token }
      });
      
      if (error) throw error;
      
      // Если верификация успешна, обновляем локальное состояние
      if (data?.success && user) {
        setIsEmailVerified(true);
      }
      
      return data;
    } catch (error) {
      console.error('Error verifying email:', error);
      return { success: false, message: 'Verification failed' };
    }
  };

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    signIn,
    signUp,
    signOut,
    sendVerificationEmail,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
