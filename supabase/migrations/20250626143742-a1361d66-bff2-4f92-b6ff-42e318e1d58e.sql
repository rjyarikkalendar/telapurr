
-- Создаем таблицу для отслеживания рефералов
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(referred_id) -- Один пользователь может быть приглашен только один раз
);

-- Добавляем RLS политики для таблицы рефералов
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Политика для просмотра своих рефералов (кого я пригласил)
CREATE POLICY "Users can view their own referrals" 
  ON public.referrals 
  FOR SELECT 
  USING (auth.uid() = referrer_id);

-- Политика для создания рефералов
CREATE POLICY "Users can create referrals" 
  ON public.referrals 
  FOR INSERT 
  WITH CHECK (true); -- Любой может создать реферал

-- Политика для обновления рефералов
CREATE POLICY "Users can update their referrals" 
  ON public.referrals 
  FOR UPDATE 
  USING (auth.uid() = referrer_id);

-- Добавляем поле для хранения реферального кода пользователя в профилях
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Добавляем поле для отслеживания того, кто пригласил этого пользователя
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.profiles(id);

-- Создаем функцию для автоматической генерации реферального кода при создании профиля
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Генерируем уникальный реферальный код на основе ID пользователя
  NEW.referral_code = 'REF' || UPPER(SUBSTRING(NEW.id::text, 1, 8));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Создаем триггер для автоматической генерации реферального кода
DROP TRIGGER IF EXISTS generate_referral_code_trigger ON public.profiles;
CREATE TRIGGER generate_referral_code_trigger
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Создаем функцию для проверки статуса профиля
CREATE OR REPLACE FUNCTION public.get_profile_completion_status(user_uuid UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  profile_record public.profiles%ROWTYPE;
  total_purchases DECIMAL(10,2) := 0;
  referrals_count INTEGER := 0;
  is_profile_complete BOOLEAN := false;
  result JSON;
BEGIN
  -- Получаем данные профиля
  SELECT * INTO profile_record FROM public.profiles WHERE id = user_uuid;
  
  -- Проверяем заполненность профиля
  is_profile_complete := (
    profile_record.first_name IS NOT NULL AND 
    profile_record.last_name IS NOT NULL AND 
    profile_record.phone IS NOT NULL AND 
    profile_record.email IS NOT NULL
  );
  
  -- Считаем количество успешных рефералов
  SELECT COUNT(*) INTO referrals_count
  FROM public.referrals
  WHERE referrer_id = user_uuid AND is_completed = true;
  
  -- Формируем результат
  result := json_build_object(
    'is_profile_complete', is_profile_complete,
    'referrals_count', referrals_count,
    'total_purchases', total_purchases,
    'missing_for_pearl', json_build_object(
      'profile_complete', NOT is_profile_complete,
      'need_referrals', GREATEST(0, 1 - referrals_count)
    )
  );
  
  RETURN result;
END;
$$;

-- Обновляем функцию handle_new_user для работы с рефералами
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  ref_code TEXT;
BEGIN
  -- Вставляем профиль пользователя
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Проверяем, есть ли реферальный код в метаданных
  ref_code := NEW.raw_user_meta_data->>'referral_code';
  
  IF ref_code IS NOT NULL THEN
    -- Находим пользователя, который пригласил
    INSERT INTO public.referrals (referrer_id, referred_id, referral_code, is_completed)
    SELECT p.id, NEW.id, ref_code, true
    FROM public.profiles p
    WHERE p.referral_code = ref_code
    ON CONFLICT DO NOTHING;
    
    -- Обновляем поле referred_by в профиле нового пользователя
    UPDATE public.profiles 
    SET referred_by = (
      SELECT id FROM public.profiles WHERE referral_code = ref_code
    )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
