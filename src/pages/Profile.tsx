
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackButton } from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, ShoppingBag, Crown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  avatar_url: string;
}

interface LoyaltyStats {
  level: string;
  cashback_percentage: number;
  total_purchases: number;
  points_balance: number;
  referrals_count: number;
  coupons_count: number;
}

const loyaltyLevels = [
  { name: "Серебряный", percentage: 1, threshold: 0, color: "bg-gray-400", icon: "🥈" },
  { name: "Жемчужный", percentage: 3, threshold: 0, color: "bg-purple-400", icon: "🦪", requirements: "Заполнить профиль + 1 друг" },
  { name: "Сапфировый", percentage: 5, threshold: 500, color: "bg-blue-400", icon: "💎" },
  { name: "Изумрудный", percentage: 7, threshold: 1000, color: "bg-green-400", icon: "💚" },
  { name: "Золотой", percentage: 10, threshold: 3000, color: "bg-yellow-400", icon: "👑" },
  { name: "Платиновый", percentage: 12.5, threshold: 6000, color: "bg-indigo-400", icon: "⭐" },
  { name: "Бриллиантовый", percentage: 15, threshold: 10000, color: "bg-pink-400", icon: "💠" },
];

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyaltyStats, setLoyaltyStats] = useState<LoyaltyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchLoyaltyStats();
      generateReferralCode();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile({
        id: data.id,
        email: data.email || '',
        full_name: data.full_name || '',
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        middle_name: data.middle_name || '',
        phone: data.phone || '',
        avatar_url: data.avatar_url || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить профиль",
        variant: "destructive",
      });
    }
  };

  const fetchLoyaltyStats = async () => {
    try {
      // Получаем статистику через прямые запросы к базе
      const [purchasesResult, loyaltyResult, referralsResult, couponsResult, cashbackResult] = await Promise.all([
        supabase.rpc('exec_sql', { 
          sql: `SELECT COALESCE(SUM(order_total), 0) as total FROM purchase_history WHERE user_id = '${user?.id}'` 
        }),
        supabase.rpc('exec_sql', { 
          sql: `SELECT COALESCE(points_balance, 0) as balance FROM loyalty_points WHERE user_id = '${user?.id}' LIMIT 1` 
        }),
        supabase.rpc('exec_sql', { 
          sql: `SELECT COUNT(*) as count FROM referrals WHERE referrer_id = '${user?.id}' AND is_completed = true` 
        }),
        supabase.rpc('exec_sql', { 
          sql: `SELECT COUNT(*) as count FROM coupons WHERE user_id = '${user?.id}' AND is_active = true` 
        }),
        supabase.rpc('calculate_cashback_percentage', { user_uuid: user?.id })
      ]);

      const totalPurchases = purchasesResult.data?.[0]?.total || 0;
      const pointsBalance = loyaltyResult.data?.[0]?.balance || 0;
      const referralsCount = referralsResult.data?.[0]?.count || 0;
      const couponsCount = couponsResult.data?.[0]?.count || 0;
      const cashbackPercentage = cashbackResult.data || 1;

      const currentLevel = loyaltyLevels.find(level => 
        level.percentage === cashbackPercentage
      ) || loyaltyLevels[0];

      setLoyaltyStats({
        level: currentLevel.name,
        cashback_percentage: cashbackPercentage,
        total_purchases: totalPurchases,
        points_balance: pointsBalance,
        referrals_count: referralsCount,
        coupons_count: couponsCount,
      });
    } catch (error) {
      console.error('Error fetching loyalty stats:', error);
      // Устанавливаем значения по умолчанию в случае ошибки
      setLoyaltyStats({
        level: "Серебряный",
        cashback_percentage: 1,
        total_purchases: 0,
        points_balance: 0,
        referrals_count: 0,
        coupons_count: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = async () => {
    try {
      const { data: existing } = await supabase.rpc('exec_sql', { 
        sql: `SELECT referral_code FROM referrals WHERE referrer_id = '${user?.id}' LIMIT 1` 
      });

      if (existing && existing.length > 0) {
        setReferralCode(existing[0].referral_code);
      } else {
        // Генерируем новый код
        const code = `REF${user?.id.slice(0, 8).toUpperCase()}`;
        setReferralCode(code);
      }
    } catch (error) {
      console.error('Error generating referral code:', error);
      const code = `REF${user?.id.slice(0, 8).toUpperCase()}`;
      setReferralCode(code);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          middle_name: profile.middle_name,
          phone: profile.phone,
          full_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Профиль обновлен",
      });

      // Перезагружаем статистику лояльности
      fetchLoyaltyStats();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Скопировано",
      description: "Реферальная ссылка скопирована в буфер обмена",
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Загрузка...</div>;
  }

  const currentLevelIndex = loyaltyLevels.findIndex(level => 
    level.name === loyaltyStats?.level
  );
  const nextLevel = loyaltyLevels[currentLevelIndex + 1];

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
            Профиль
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Основная информация профиля */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  Личные данные
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">Имя *</Label>
                      <Input
                        id="first_name"
                        value={profile?.first_name || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Фамилия *</Label>
                      <Input
                        id="last_name"
                        value={profile?.last_name || ''}
                        onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="middle_name">Отчество</Label>
                    <Input
                      id="middle_name"
                      value={profile?.middle_name || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, middle_name: e.target.value} : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile?.email || ''}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile(prev => prev ? {...prev, phone: e.target.value} : null)}
                    />
                    {!profile?.phone && (
                      <p className="text-sm text-green-600 mt-1">
                        💡 При добавлении телефона вы получите скидку 15% на следующий заказ!
                      </p>
                    )}
                  </div>
                  <Button type="submit" disabled={saving} className="bg-tea-brown hover:bg-tea-brown/90">
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Система лояльности */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Программа лояльности
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={`${loyaltyLevels.find(l => l.name === loyaltyStats?.level)?.color} text-white text-lg px-4 py-2`}>
                    {loyaltyLevels.find(l => l.name === loyaltyStats?.level)?.icon} {loyaltyStats?.level}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Текущий кешбек: {loyaltyStats?.cashback_percentage}%
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded">
                    <ShoppingBag className="w-6 h-6 mx-auto mb-1 text-tea-brown" />
                    <p className="text-sm text-gray-600">Общие покупки</p>
                    <p className="font-semibold">{loyaltyStats?.total_purchases}€</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <Gift className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-sm text-gray-600">Баланс баллов</p>
                    <p className="font-semibold">{loyaltyStats?.points_balance}</p>
                  </div>
                </div>

                {nextLevel && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-600 mb-1">До следующего уровня:</p>
                    <p className="font-medium">{nextLevel.name} ({nextLevel.percentage}%)</p>
                    <p className="text-xs text-gray-600">
                      Нужно еще {nextLevel.threshold - (loyaltyStats?.total_purchases || 0)}€
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">Уровни лояльности:</h4>
                  {loyaltyLevels.map((level, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{level.icon}</span>
                        <span>{level.name}</span>
                      </span>
                      <span className="text-gray-600">{level.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Реферальная программа */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Реферальная программа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-lg font-semibold text-green-600">20€ за друга!</p>
                  <p className="text-sm text-gray-600">
                    Приглашайте друзей и получайте 20€ на каждого
                  </p>
                </div>

                <div>
                  <Label>Ваша реферальная ссылка:</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={`${window.location.origin}?ref=${referralCode}`}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button onClick={copyReferralLink} variant="outline">
                      Копировать
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Приглашено друзей:</p>
                  <p className="text-2xl font-bold text-blue-600">{loyaltyStats?.referrals_count}</p>
                </div>
              </CardContent>
            </Card>

            {/* Купоны и скидки */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-500" />
                  Мои купоны
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Активных купонов:</p>
                  <p className="text-2xl font-bold text-purple-600">{loyaltyStats?.coupons_count}</p>
                </div>
                {loyaltyStats?.coupons_count === 0 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    У вас пока нет активных купонов
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
