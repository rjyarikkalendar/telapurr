
-- Обновляем функцию handle_new_user для более надежной работы с рефералами
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  ref_code TEXT;
  referrer_user_id UUID;
BEGIN
  -- Получаем реферальный код из метаданных и очищаем от пробелов
  ref_code := TRIM(NEW.raw_user_meta_data->>'referral_code');
  
  -- Вставляем профиль пользователя
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Обрабатываем реферальный код если он есть и не пустой
  IF ref_code IS NOT NULL AND ref_code != '' THEN
    -- Находим пользователя по реферальному коду (делаем поиск более точным)
    SELECT id INTO referrer_user_id 
    FROM public.profiles 
    WHERE UPPER(TRIM(referral_code)) = UPPER(ref_code)
    LIMIT 1;
    
    -- Если нашли пользователя с таким кодом
    IF referrer_user_id IS NOT NULL THEN
      -- Добавляем запись о реферале
      INSERT INTO public.referrals (referrer_id, referred_id, referral_code, is_completed)
      VALUES (referrer_user_id, NEW.id, ref_code, TRUE);
      
      -- Обновляем поле referred_by в профиле нового пользователя  
      UPDATE public.profiles 
      SET referred_by = referrer_user_id
      WHERE id = NEW.id;
      
      -- Логируем успешное создание реферала (для отладки)
      RAISE NOTICE 'Referral created: % referred by %', NEW.id, referrer_user_id;
    ELSE
      -- Логируем, что реферальный код не найден (для отладки)
      RAISE NOTICE 'Referral code not found: %', ref_code;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Убеждаемся, что триггер генерации реферального кода выполняется ПЕРЕД триггером обработки нового пользователя
DROP TRIGGER IF EXISTS generate_referral_code_trigger ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Создаем триггер для генерации реферального кода (выполняется первым)
CREATE TRIGGER generate_referral_code_trigger
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Создаем триггер для обработки нового пользователя (выполняется после создания профиля)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Добавляем индекс для быстрого поиска по реферальному коду
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON public.referrals(referred_id);
