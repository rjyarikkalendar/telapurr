import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUpload } from "@/components/AvatarUpload";
import { BackButton } from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, ShoppingBag, Crown, CheckCircle, Edit } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { PhoneInput } from "@/components/PhoneInput";
import { validatePhone, formatPhoneForStorage, formatPhoneForDisplay, getPhoneValidationMessage } from "@/utils/phoneValidation";

interface Profile {
  id: string;
  email: string;
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
  { name: "Серебряный", nameEn: "Silver", nameEs: "Plateado", nameZh: "银级", percentage: 1, threshold: 0, color: "bg-gray-400", icon: "🥈", key: "silver" },
  { name: "Жемчужный", nameEn: "Pearl", nameEs: "Perla", nameZh: "珍珠", percentage: 3, threshold: 0, color: "bg-purple-400", icon: "🦪", key: "pearl" },
  { name: "Сапфировый", nameEn: "Sapphire", nameEs: "Zafiro", nameZh: "蓝宝石", percentage: 5, threshold: 500, color: "bg-blue-400", icon: "💎", key: "sapphire" },
  { name: "Изумрудный", nameEn: "Emerald", nameEs: "Esmeralda", nameZh: "翡翠", percentage: 7, threshold: 1000, color: "bg-green-400", icon: "💚", key: "emerald" },
  { name: "Золотой", nameEn: "Gold", nameEs: "Oro", nameZh: "金级", percentage: 10, threshold: 3000, color: "bg-yellow-400", icon: "👑", key: "gold" },
  { name: "Платиновый", nameEn: "Platinum", nameEs: "Platino", nameZh: "铂金", percentage: 12.5, threshold: 6000, color: "bg-indigo-400", icon: "⭐", key: "platinum" },
  { name: "Бриллиантовый", nameEn: "Diamond", nameEs: "Diamante", nameZh: "钻石", percentage: 15, threshold: 10000, color: "bg-pink-400", icon: "💠", key: "diamond" },
];

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, currentLang } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loyaltyStats, setLoyaltyStats] = useState<LoyaltyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        middle_name: data.middle_name || '',
        phone: '', // This field doesn't exist in the table yet
        avatar_url: data.avatar_url || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: t.profile.error,
        description: t.profile.error,
        variant: "destructive",
      });
    }
  };

  const fetchLoyaltyStats = async () => {
    try {
      // Placeholder data since loyalty tables don't exist yet
      const totalPurchases = 0;
      const pointsBalance = 0;
      const referralsCount = 0;
      const couponsCount = 0;
      
      let cashbackPercentage = 1; // Default silver level
      
      // Determine loyalty level based on purchases
      if (totalPurchases >= 10000) {
        cashbackPercentage = 15;
      } else if (totalPurchases >= 6000) {
        cashbackPercentage = 12.5;
      } else if (totalPurchases >= 3000) {
        cashbackPercentage = 10;
      } else if (totalPurchases >= 1000) {
        cashbackPercentage = 7;
      } else if (totalPurchases >= 500) {
        cashbackPercentage = 5;
      } else if (profile?.first_name && profile?.last_name && referralsCount >= 1) {
        cashbackPercentage = 3; // Pearl level
      }

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
      const code = `REF${user?.id.slice(0, 8).toUpperCase()}`;
      setReferralCode(code);
    } catch (error) {
      console.error('Error generating referral code:', error);
      const code = `REF${user?.id.slice(0, 8).toUpperCase()}`;
      setReferralCode(code);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    setProfile(prev => prev ? {...prev, phone: newPhone} : null);
    
    // Валидация при изменении
    const error = getPhoneValidationMessage(newPhone);
    setPhoneError(error);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !user) return;

    // Проверяем валидность телефона перед сохранением
    if (profile.phone) {
      const phoneError = getPhoneValidationMessage(profile.phone);
      if (phoneError) {
        setPhoneError(phoneError);
        toast({
          title: t.profile.error,
          description: phoneError,
          variant: "destructive",
        });
        return;
      }
    }

    setSaving(true);
    try {
      const phoneForStorage = profile.phone ? formatPhoneForStorage(profile.phone) : null;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          middle_name: profile.middle_name,
          phone: phoneForStorage,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t.profile.success,
        description: t.profile.success,
      });

      // Переключаемся в режим просмотра после сохранения
      setIsEditing(false);

      // Reload loyalty stats
      fetchLoyaltyStats();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t.profile.error,
        description: t.profile.error,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyReferralLink = () => {
    const link = `https://tepurrfect.com?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Скопировано",
      description: "Реферальная ссылка скопирована в буфер обмена",
    });
  };

  const getLevelName = (level: any) => {
    switch (currentLang) {
      case 'en': return level.nameEn;
      case 'es': return level.nameEs;
      case 'zh': return level.nameZh;
      default: return level.name;
    }
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setProfile(prev => prev ? {...prev, avatar_url: newAvatarUrl} : null);
  };

  const getInitials = () => {
    if (!profile?.first_name && !profile?.last_name) return "?";
    return `${profile?.first_name?.[0] || ''}${profile?.last_name?.[0] || ''}`;
  };

  // Проверяем, заполнен ли профиль
  const isProfileComplete = profile?.first_name && profile?.last_name;

  // Определяем, нужно ли показывать режим редактирования по умолчанию
  useEffect(() => {
    if (profile && !isProfileComplete) {
      setIsEditing(true);
    }
  }, [profile, isProfileComplete]);

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
            {t.profile.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.profile.personalInfo}</span>
                  {isProfileComplete && !isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Изменить
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Avatar Upload Section */}
                  <div className="flex justify-center">
                    <AvatarUpload
                      userId={user?.id || ''}
                      currentAvatarUrl={profile?.avatar_url}
                      onAvatarUpdate={handleAvatarUpdate}
                      initials={getInitials()}
                    />
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">{t.profile.firstName} *</Label>
                        {isEditing ? (
                          <Input
                            id="first_name"
                            value={profile?.first_name || ''}
                            onChange={(e) => setProfile(prev => prev ? {...prev, first_name: e.target.value} : null)}
                            required
                          />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded border min-h-[40px] flex items-center">
                            {profile?.first_name || '-'}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="last_name">{t.profile.lastName} *</Label>
                        {isEditing ? (
                          <Input
                            id="last_name"
                            value={profile?.last_name || ''}
                            onChange={(e) => setProfile(prev => prev ? {...prev, last_name: e.target.value} : null)}
                            required
                          />
                        ) : (
                          <div className="p-2 bg-gray-50 rounded border min-h-[40px] flex items-center">
                            {profile?.last_name || '-'}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="middle_name">{t.profile.middleName}</Label>
                      {isEditing ? (
                        <Input
                          id="middle_name"
                          value={profile?.middle_name || ''}
                          onChange={(e) => setProfile(prev => prev ? {...prev, middle_name: e.target.value} : null)}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded border min-h-[40px] flex items-center">
                          {profile?.middle_name || '-'}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">{t.profile.email} *</Label>
                      <div className="p-2 bg-gray-100 rounded border min-h-[40px] flex items-center text-gray-600">
                        {profile?.email || ''}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">{t.profile.phone}</Label>
                      {isEditing ? (
                        <>
                          <PhoneInput
                            value={formatPhoneForDisplay(profile?.phone || '')}
                            onChange={handlePhoneChange}
                            className={phoneError ? "border-red-500" : ""}
                          />
                          {phoneError && (
                            <p className="text-sm text-red-600 mt-1">
                              {phoneError}
                            </p>
                          )}
                          {!profile?.phone && !phoneError && (
                            <p className="text-sm text-green-600 mt-1">
                              {t.profile.phoneBonus}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="p-2 bg-gray-50 rounded border min-h-[40px] flex items-center">
                          {formatPhoneForDisplay(profile?.phone || '') || '-'}
                        </div>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button type="submit" disabled={saving || !!phoneError} className="bg-tea-brown hover:bg-tea-brown/90">
                          {saving ? t.profile.saving : t.profile.save}
                        </Button>
                        {isProfileComplete && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsEditing(false);
                              setPhoneError(null);
                              // Сбрасываем изменения при отмене
                              fetchProfile();
                            }}
                          >
                            Отмена
                          </Button>
                        )}
                      </div>
                    )}
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Система лояльности */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  {t.profile.loyalty.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={`${loyaltyLevels.find(l => l.name === loyaltyStats?.level)?.color} text-white text-lg px-4 py-2`}>
                    {loyaltyLevels.find(l => l.name === loyaltyStats?.level)?.icon} {getLevelName(loyaltyLevels.find(l => l.name === loyaltyStats?.level)!)}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    {t.profile.loyalty.currentCashback}: {loyaltyStats?.cashback_percentage}%
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded">
                    <ShoppingBag className="w-6 h-6 mx-auto mb-1 text-tea-brown" />
                    <p className="text-sm text-gray-600">{t.profile.loyalty.totalPurchases}</p>
                    <p className="font-semibold">{loyaltyStats?.total_purchases}€</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <Gift className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-sm text-gray-600">{t.profile.loyalty.pointsBalance}</p>
                    <p className="font-semibold">{loyaltyStats?.points_balance}</p>
                  </div>
                </div>

                {nextLevel && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-600 mb-1">{t.profile.loyalty.nextLevel}:</p>
                    <p className="font-medium">{getLevelName(nextLevel)} ({nextLevel.percentage}%)</p>
                    <p className="text-xs text-gray-600">
                      {t.profile.loyalty.need} {nextLevel.threshold - (loyaltyStats?.total_purchases || 0)}€
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium">{t.profile.loyalty.levels}:</h4>
                  {loyaltyLevels.map((level, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-gray-50">
                      <span className="flex items-center gap-2">
                        <span>{level.icon}</span>
                        <span className="font-medium">{getLevelName(level)}</span>
                        <span className="text-gray-600">({level.percentage}%)</span>
                      </span>
                      <span className="text-xs text-gray-500">
                        {t.profile.loyalty.levelDescriptions[level.key as keyof typeof t.profile.loyalty.levelDescriptions]}
                      </span>
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
                  {t.profile.referral.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-lg font-semibold text-green-600">{t.profile.referral.bonus}</p>
                  <p className="text-sm text-gray-600">
                    {t.profile.referral.description}
                  </p>
                </div>

                <div>
                  <Label>{t.profile.referral.link}</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={`https://tepurrfect.com?ref=${referralCode}`}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button onClick={copyReferralLink} variant="outline">
                      {t.profile.referral.copy}
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">{t.profile.referral.invited}</p>
                  <p className="text-2xl font-bold text-blue-600">{loyaltyStats?.referrals_count}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium mb-2">{t.profile.referral.howItWorks}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.profile.referral.step1}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.profile.referral.step2}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{t.profile.referral.step3}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Купоны и скидки */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-500" />
                  {t.profile.coupons.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{t.profile.coupons.active}</p>
                  <p className="text-2xl font-bold text-purple-600">{loyaltyStats?.coupons_count}</p>
                </div>
                {loyaltyStats?.coupons_count === 0 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {t.profile.coupons.none}
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
