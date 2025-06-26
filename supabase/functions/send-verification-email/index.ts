
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  firstName: string;
  lastName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName }: EmailRequest = await req.json();
    
    // Создаем Supabase клиент с service role ключом
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Генерируем уникальный токен
    const token = crypto.randomUUID();
    
    // Обновляем профиль с токеном верификации
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ email_verification_token: token })
      .eq('email', email);

    if (updateError) {
      throw new Error(`Failed to update profile: ${updateError.message}`);
    }

    // Создаем ссылку для верификации
    const verificationUrl = `${Deno.env.get('SITE_URL') || 'http://localhost:5173'}/?verify_email=${token}`;

    // HTML шаблон письма
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Подтверждение Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #D3E4E0; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: #2D3E35; margin-bottom: 20px;">Добро пожаловать в TEA CRAFT!</h1>
            <p style="color: #2D3E35; font-size: 16px; margin-bottom: 30px;">
              Привет, ${firstName} ${lastName}!<br>
              Спасибо за регистрацию. Пожалуйста, подтвердите свой email адрес.
            </p>
            <a href="${verificationUrl}" 
               style="background-color: #8B4513; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Подтвердить Email
            </a>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
              <a href="${verificationUrl}" style="color: #8B4513;">${verificationUrl}</a>
            </p>
          </div>
        </body>
      </html>
    `;

    console.log(`Verification email would be sent to: ${email}`);
    console.log(`Verification URL: ${verificationUrl}`);
    console.log(`Token: ${token}`);

    // В реальной среде здесь бы отправлялось письмо через Resend или другой сервис
    // Пока что просто логируем информацию
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Verification email sent",
        verificationUrl // Временно возвращаем URL для тестирования
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
