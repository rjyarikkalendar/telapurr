
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PhoneValidationRequest {
  phone: string;
}

interface PhoneValidationResponse {
  isValid: boolean;
  message?: string;
  formattedPhone?: string;
}

// Функция для валидации российского номера телефона
function validateRussianPhone(phone: string): PhoneValidationResponse {
  if (!phone) {
    return { isValid: true }; // Телефон не обязательный
  }

  // Удаляем все символы кроме цифр
  const digits = phone.replace(/\D/g, '');
  
  // Проверяем российский номер
  if (digits.length !== 11) {
    return {
      isValid: false,
      message: 'Номер телефона должен содержать 11 цифр'
    };
  }
  
  if (!digits.startsWith('7')) {
    return {
      isValid: false,
      message: 'Номер должен начинаться с +7'
    };
  }

  // Проверяем корректность кода оператора (первая цифра после 7)
  const operatorCode = digits.charAt(1);
  const validOperatorCodes = ['9', '8', '3', '4', '5'];
  
  if (!validOperatorCodes.includes(operatorCode)) {
    return {
      isValid: false,
      message: 'Неверный код оператора'
    };
  }

  // Форматируем номер для хранения
  const formattedPhone = `+${digits}`;
  
  return {
    isValid: true,
    formattedPhone: formattedPhone
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Проверяем аутентификацию пользователя
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'POST') {
      const { phone }: PhoneValidationRequest = await req.json();
      
      console.log(`Validating phone for user ${user.id}: ${phone}`);
      
      const validation = validateRussianPhone(phone);
      
      return new Response(
        JSON.stringify(validation),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in validate-phone function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
