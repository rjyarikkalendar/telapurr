
-- Добавляем поля для подтверждения email в таблицу profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verification_token TEXT;

-- Обновляем функцию handle_new_user для правильной работы с рефералами
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  ref_code TEXT;
  referrer_user_id UUID;
BEGIN
  -- Получаем реферальный код из метаданных
  ref_code := NEW.raw_user_meta_data->>'referral_code';
  
  -- Вставляем профиль пользователя
  INSERT INTO public.profiles (id, email, first_name, last_name, email_verified)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    FALSE
  );
  
  -- Обрабатываем реферальный код если он есть
  IF ref_code IS NOT NULL AND ref_code != '' THEN
    -- Находим пользователя по реферальному коду
    SELECT id INTO referrer_user_id 
    FROM public.profiles 
    WHERE referral_code = ref_code;
    
    -- Если нашли пользователя с таким кодом
    IF referrer_user_id IS NOT NULL THEN
      -- Добавляем запись о реферале
      INSERT INTO public.referrals (referrer_id, referred_id, referral_code, is_completed)
      VALUES (referrer_user_id, NEW.id, ref_code, TRUE);
      
      -- Обновляем поле referred_by в профиле нового пользователя
      UPDATE public.profiles 
      SET referred_by = referrer_user_id
      WHERE id = NEW.id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Создаем функцию для верификации email
CREATE OR REPLACE FUNCTION public.verify_email(token TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_profile public.profiles%ROWTYPE;
  result JSON;
BEGIN
  -- Находим пользователя по токену
  SELECT * INTO user_profile 
  FROM public.profiles 
  WHERE email_verification_token = token AND email_verified = FALSE;
  
  IF user_profile.id IS NULL THEN
    result := json_build_object(
      'success', false,
      'message', 'Invalid or expired token'
    );
  ELSE
    -- Обновляем статус верификации
    UPDATE public.profiles 
    SET email_verified = TRUE, email_verification_token = NULL
    WHERE id = user_profile.id;
    
    result := json_build_object(
      'success', true,
      'message', 'Email verified successfully',
      'email', user_profile.email
    );
  END IF;
  
  RETURN result;
END;
$$;

-- Добавляем RLS политики для новых полей
DROP POLICY IF EXISTS "Users can view their own profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profiles" ON public.profiles;

CREATE POLICY "Users can view their own profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profiles" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Включаем RLS если не включен
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы referrals
CREATE POLICY "Users can view their referrals" 
ON public.referrals 
FOR SELECT 
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can insert referrals" 
ON public.referrals 
FOR INSERT 
WITH CHECK (true);
