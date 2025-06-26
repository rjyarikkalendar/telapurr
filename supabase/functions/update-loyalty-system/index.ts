
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Обновляем функцию расчета кешбека
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE OR REPLACE FUNCTION public.calculate_cashback_percentage(user_uuid UUID)
        RETURNS DECIMAL(5,2)
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $function$
        DECLARE
          total_purchases DECIMAL(10,2);
          cashback_rate DECIMAL(5,2);
          profile_complete BOOLEAN;
          referrals_count INTEGER;
        BEGIN
          -- Получаем общую сумму покупок пользователя
          SELECT COALESCE(SUM(order_total), 0) INTO total_purchases
          FROM public.purchase_history
          WHERE user_id = user_uuid;
          
          -- Проверяем заполненность профиля
          SELECT (first_name IS NOT NULL AND last_name IS NOT NULL AND phone IS NOT NULL AND email IS NOT NULL)
          INTO profile_complete
          FROM public.profiles
          WHERE id = user_uuid;
          
          -- Считаем количество приглашенных друзей
          SELECT COUNT(*) INTO referrals_count
          FROM public.referrals
          WHERE referrer_id = user_uuid AND is_completed = true;
          
          -- Рассчитываем процент кешбека на основе правил лояльности
          CASE 
            WHEN total_purchases >= 10000 THEN cashback_rate := 15.0;  -- Бриллиантовый (15%)
            WHEN total_purchases >= 6000 THEN cashback_rate := 12.5;   -- Платиновый (12.5%)
            WHEN total_purchases >= 3000 THEN cashback_rate := 10.0;   -- Золотой (10%)
            WHEN total_purchases >= 1000 THEN cashback_rate := 7.0;    -- Изумрудный (7%)
            WHEN total_purchases >= 500 THEN cashback_rate := 5.0;     -- Сапфировый (5%)
            WHEN profile_complete AND referrals_count >= 1 THEN cashback_rate := 3.0; -- Жемчужный (3%)
            ELSE cashback_rate := 1.0;                                 -- Серебряный (1%)
          END CASE;
          
          RETURN cashback_rate;
        END;
        $function$;
      `
    });

    if (error) {
      console.error('Error updating loyalty function:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
