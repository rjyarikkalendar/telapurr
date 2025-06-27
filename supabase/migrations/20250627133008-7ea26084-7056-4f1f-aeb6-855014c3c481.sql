
-- Генерируем реферальные коды для всех существующих пользователей, у которых их нет
UPDATE public.profiles 
SET referral_code = 'REF' || UPPER(SUBSTRING(id::text, 1, 8))
WHERE referral_code IS NULL;

-- Проверяем результат (эта команда покажет количество обновленных записей)
SELECT COUNT(*) as updated_users 
FROM public.profiles 
WHERE referral_code IS NOT NULL;
