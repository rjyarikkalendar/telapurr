
-- Сначала проверим, существует ли триггер
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Проверим, есть ли записи в auth.users
SELECT id, email, created_at, raw_user_meta_data 
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;

-- Проверим записи в profiles
SELECT id, email, first_name, last_name, referral_code, created_at 
FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 5;

-- Пересоздаем функцию handle_new_user с улучшенной обработкой ошибок
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  ref_code TEXT;
  referrer_user_id UUID;
BEGIN
  -- Логируем начало выполнения функции
  RAISE NOTICE 'handle_new_user started for user: %', NEW.id;
  
  -- Получаем реферальный код из метаданных и очищаем от пробелов
  ref_code := TRIM(NEW.raw_user_meta_data->>'referral_code');
  RAISE NOTICE 'Referral code from metadata: %', ref_code;
  
  -- Вставляем профиль пользователя
  BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
      NEW.id, 
      NEW.email, 
      NEW.raw_user_meta_data->>'first_name',
      NEW.raw_user_meta_data->>'last_name'
    );
    RAISE NOTICE 'Profile created for user: %', NEW.id;
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  END;
  
  -- Обрабатываем реферальный код если он есть и не пустой
  IF ref_code IS NOT NULL AND ref_code != '' THEN
    RAISE NOTICE 'Processing referral code: %', ref_code;
    
    -- Находим пользователя по реферальному коду (делаем поиск более точным)
    SELECT id INTO referrer_user_id 
    FROM public.profiles 
    WHERE UPPER(TRIM(referral_code)) = UPPER(ref_code)
    LIMIT 1;
    
    -- Если нашли пользователя с таким кодом
    IF referrer_user_id IS NOT NULL THEN
      RAISE NOTICE 'Found referrer: %', referrer_user_id;
      
      -- Добавляем запись о реферале
      BEGIN
        INSERT INTO public.referrals (referrer_id, referred_id, referral_code, is_completed)
        VALUES (referrer_user_id, NEW.id, ref_code, TRUE);
        RAISE NOTICE 'Referral record created';
      EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Failed to create referral record: %', SQLERRM;
      END;
      
      -- Обновляем поле referred_by в профиле нового пользователя  
      BEGIN
        UPDATE public.profiles 
        SET referred_by = referrer_user_id
        WHERE id = NEW.id;
        RAISE NOTICE 'Updated referred_by field';
      EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Failed to update referred_by: %', SQLERRM;
      END;
    ELSE
      -- Логируем, что реферальный код не найден (для отладки)
      RAISE NOTICE 'Referral code not found: %', ref_code;
    END IF;
  END IF;
  
  RAISE NOTICE 'handle_new_user completed for user: %', NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Удаляем старые триггеры если они есть
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS generate_referral_code_trigger ON public.profiles;

-- Создаем триггер для генерации реферального кода (выполняется первым)
CREATE TRIGGER generate_referral_code_trigger
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Создаем триггер для обработки нового пользователя (выполняется после создания в auth.users)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Проверяем, что триггеры созданы
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name IN ('on_auth_user_created', 'generate_referral_code_trigger');
