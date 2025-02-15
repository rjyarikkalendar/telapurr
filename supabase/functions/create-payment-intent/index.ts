
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@13.10.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, deliveryInfo, userId } = await req.json();
    
    // Создаем или получаем customer в Stripe
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    let customer;
    let customerId = null;

    if (profiles?.email) {
      const customers = await stripe.customers.list({
        email: profiles.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({
          email: profiles.email,
          name: `${profiles.first_name} ${profiles.last_name}`,
          phone: profiles.phone,
        });
        customerId = newCustomer.id;
      }
    }

    // Создаем платежное намерение
    const totalAmount = items.reduce((sum: number, item: any) => 
      sum + item.price * item.quantity, 0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Конвертируем в центы
      currency: 'eur',
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: '', // Будет обновлено после создания заказа
      },
    });

    // Создаем заказ в базе данных
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        currency: 'EUR',
        payment_intent_id: paymentIntent.id,
        shipping_address: deliveryInfo,
        items: items,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(orderError.message);
    }

    // Обновляем metadata в платежном намерении
    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        orderId: order.id,
      },
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        orderId: order.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
