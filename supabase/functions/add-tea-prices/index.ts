
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    console.log('Adding tea prices for new teas...');

    // Получаем новые чаи, которые только что добавили
    const { data: newTeas, error: teasError } = await supabase
      .from('teas')
      .select('id, title, price')
      .in('title', [
        'Ye Shen Shan',
        'Lanin Tie Bin', 
        'Lao Ban Zhang Da Shu Guntin',
        'Silver Needles',
        'Gu Shu Ren',
        'Imperial Gong Ting',
        'Lao Ban Zhang'
      ]);

    if (teasError) {
      throw new Error(`Error fetching teas: ${teasError.message}`);
    }

    console.log('Found teas:', newTeas);

    // Данные цен для каждого чая
    const teaPricesData = [
      {
        title: 'Ye Shen Shan',
        prices: [
          { weight_type: '50_gramm', price: 7 },
          { weight_type: '100_gramm', price: 14 },
          { weight_type: '200_gramm', price: 28 },
          { weight_type: '357_gramm', price: 50 }
        ]
      },
      {
        title: 'Lanin Tie Bin',
        prices: [
          { weight_type: '50_gramm', price: 12 },
          { weight_type: '100_gramm', price: 24 },
          { weight_type: '200_gramm', price: 48 },
          { weight_type: '357_gramm', price: 86 }
        ]
      },
      {
        title: 'Lao Ban Zhang Da Shu Guntin',
        prices: [
          { weight_type: '50_gramm', price: 5 },
          { weight_type: '100_gramm', price: 10 },
          { weight_type: '200_gramm', price: 20 },
          { weight_type: '357_gramm', price: 36 }
        ]
      },
      {
        title: 'Silver Needles',
        prices: [
          { weight_type: '50_gramm', price: 13 },
          { weight_type: '100_gramm', price: 25 },
          { weight_type: '200_gramm', price: 50 },
          { weight_type: '400_gramm', price: 100 }
        ]
      },
      {
        title: 'Gu Shu Ren',
        prices: [
          { weight_type: '50_gramm', price: 11 },
          { weight_type: '100_gramm', price: 22 },
          { weight_type: '200_gramm', price: 44 },
          { weight_type: '357_gramm', price: 79 }
        ]
      },
      {
        title: 'Imperial Gong Ting',
        prices: [
          { weight_type: '50_gramm', price: 8 },
          { weight_type: '100_gramm', price: 15 },
          { weight_type: '200_gramm', price: 30 },
          { weight_type: '357_gramm', price: 54 }
        ]
      },
      {
        title: 'Lao Ban Zhang',
        prices: [
          { weight_type: '50_gramm', price: 11 },
          { weight_type: '100_gramm', price: 22 },
          { weight_type: '200_gramm', price: 44 },
          { weight_type: '357_gramm', price: 79 }
        ]
      }
    ];

    // Добавляем цены для каждого чая
    for (const teaData of teaPricesData) {
      const tea = newTeas?.find(t => t.title === teaData.title);
      if (!tea) {
        console.log(`Tea ${teaData.title} not found, skipping...`);
        continue;
      }

      for (let i = 0; i < teaData.prices.length; i++) {
        const priceData = teaData.prices[i];
        
        // Проверяем, не существует ли уже такая цена
        const { data: existingPrice } = await supabase
          .from('tea_prices')
          .select('id')
          .eq('tea_id', tea.id)
          .eq('weight_type', priceData.weight_type)
          .single();

        if (existingPrice) {
          console.log(`Price for ${tea.title} (${priceData.weight_type}) already exists, skipping...`);
          continue;
        }

        const { error: priceError } = await supabase
          .from('tea_prices')
          .insert({
            tea_id: tea.id,
            weight_type: priceData.weight_type,
            price: priceData.price,
            price_index: i
          });

        if (priceError) {
          console.error(`Error adding price for ${tea.title} (${priceData.weight_type}):`, priceError);
        } else {
          console.log(`Added price for ${tea.title} (${priceData.weight_type}): ${priceData.price} EUR`);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Tea prices added successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding tea prices:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
