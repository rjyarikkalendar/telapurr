
-- Обновляем функцию handle_new_user для правильной работы с рефералами
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  ref_code TEXT;
  referrer_user_id UUID;
BEGIN
  -- Получаем реферальный код из метаданных
  ref_code := NEW.raw_user_meta_data->>'referral_code';
  
  -- Вставляем профиль пользователя
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Обновляем функцию get_profile_completion_status для добавления количества рефералов
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
  user_referral_code TEXT;
  result JSON;
BEGIN
  -- Получаем данные профиля
  SELECT * INTO profile_record FROM public.profiles WHERE id = user_uuid;
  
  -- Получаем реферальный код пользователя
  user_referral_code := profile_record.referral_code;
  
  -- Проверяем заполненность профиля
  is_profile_complete := (
    profile_record.first_name IS NOT NULL AND 
    profile_record.last_name IS NOT NULL AND 
    profile_record.phone IS NOT NULL AND 
    profile_record.email IS NOT NULL
  );
  
  -- Считаем количество успешных рефералов (кого пригласил этот пользователь)
  SELECT COUNT(*) INTO referrals_count
  FROM public.referrals
  WHERE referrer_id = user_uuid AND is_completed = true;
  
  -- Формируем результат
  result := json_build_object(
    'is_profile_complete', is_profile_complete,
    'referrals_count', referrals_count,
    'total_purchases', total_purchases,
    'referral_code', user_referral_code,
    'missing_for_pearl', json_build_object(
      'profile_complete', NOT is_profile_complete,
      'need_referrals', GREATEST(0, 1 - referrals_count)
    )
  );
  
  RETURN result;
END;
$$;
