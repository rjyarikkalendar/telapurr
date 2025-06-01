
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
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const type = url.searchParams.get('type');
    const kind = url.searchParams.get('kind');
    const ageMin = url.searchParams.get('age_min');
    const ageMax = url.searchParams.get('age_max');
    const yearbirthMin = url.searchParams.get('yearbirth_min');
    const yearbirthMax = url.searchParams.get('yearbirth_max');
    const inStock = url.searchParams.get('in_stock');
    const priceMin = url.searchParams.get('price_min');
    const priceMax = url.searchParams.get('price_max');
    const sort = url.searchParams.get('sort') || 'created_at_desc';

    console.log('Tea API - GET request with params:', {
      page,
      limit,
      type,
      kind,
      age_min: ageMin,
      age_max: ageMax,
      yearbirth_min: yearbirthMin,
      yearbirth_max: yearbirthMax,
      in_stock: inStock,
      price_min: priceMin,
      price_max: priceMax,
      sort
    });

    // Построение запроса
    let query = supabase
      .from('teas')
      .select('*', { count: 'exact' });

    // Применение фильтров
    if (type && type !== 'null') {
      query = query.eq('type', type);
    }
    
    if (kind && kind !== 'null') {
      query = query.eq('kind', kind);
    }
    
    if (ageMin && ageMin !== 'null') {
      query = query.gte('age', parseInt(ageMin));
    }
    
    if (ageMax && ageMax !== 'null') {
      query = query.lte('age', parseInt(ageMax));
    }
    
    if (yearbirthMin && yearbirthMin !== 'null') {
      query = query.gte('yearbirth', parseInt(yearbirthMin));
    }
    
    if (yearbirthMax && yearbirthMax !== 'null') {
      query = query.lte('yearbirth', parseInt(yearbirthMax));
    }
    
    if (inStock && inStock !== 'null') {
      query = query.eq('in_stock', inStock === 'true');
    }
    
    if (priceMin && priceMin !== 'null') {
      query = query.gte('price', parseFloat(priceMin));
    }
    
    if (priceMax && priceMax !== 'null') {
      query = query.lte('price', parseFloat(priceMax));
    }

    // Применение сортировки
    if (sort) {
      const [field, direction] = sort.split('_');
      const ascending = direction === 'asc';
      query = query.order(field, { ascending });
    }

    // Применение пагинации
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: teas, error: teasError, count } = await query;

    if (teasError) {
      throw new Error(`Error fetching teas: ${teasError.message}`);
    }

    // Получаем цены для чаев
    const teaIds = teas?.map(tea => tea.id) || [];
    const { data: prices, error: pricesError } = await supabase
      .from('tea_prices')
      .select('*')
      .in('tea_id', teaIds);

    if (pricesError) {
      console.error('Error fetching prices:', pricesError);
    }

    // Добавляем цены к чаям
    const teasWithPrices = teas?.map(tea => ({
      ...tea,
      prices: prices?.filter(price => price.tea_id === tea.id).sort((a, b) => a.price_index - b.price_index) || []
    })) || [];

    const totalPages = Math.ceil((count || 0) / limit);

    const response = {
      data: teasWithPrices,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    };

    console.log('Tea API response:', { 
      itemsCount: teasWithPrices.length, 
      total: count, 
      page, 
      totalPages 
    });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in tea API:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        data: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
