
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const method = req.method
    
    // GET /tea-api - список чаев
    if (method === 'GET') {
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '12')
      const type = url.searchParams.get('type')
      const kind = url.searchParams.get('kind')
      const age_min = url.searchParams.get('age_min')
      const age_max = url.searchParams.get('age_max')
      const yearbirth_min = url.searchParams.get('yearbirth_min')
      const yearbirth_max = url.searchParams.get('yearbirth_max')
      const in_stock = url.searchParams.get('in_stock')
      const price_min = url.searchParams.get('price_min')
      const price_max = url.searchParams.get('price_max')
      const sort = url.searchParams.get('sort') || 'created_at_desc'

      console.log('Tea API - GET request with params:', {
        page, limit, type, kind, age_min, age_max, yearbirth_min, yearbirth_max, 
        in_stock, price_min, price_max, sort
      })

      // Используем явную связь через tea_id для избежания неоднозначности
      let query = supabase.from('teas').select('*, tea_prices!tea_prices_tea_id_fkey(id, weight_type, price, price_index)', { count: 'exact' })

      // Применяем фильтры
      if (type) {
        query = query.eq('type', type)
      }
      if (kind) {
        query = query.eq('kind', kind)
      }
      if (age_min) {
        query = query.gte('age', parseInt(age_min))
      }
      if (age_max) {
        query = query.lte('age', parseInt(age_max))
      }
      if (yearbirth_min) {
        query = query.gte('yearbirth', parseInt(yearbirth_min))
      }
      if (yearbirth_max) {
        query = query.lte('yearbirth', parseInt(yearbirth_max))
      }
      if (in_stock === 'true') {
        query = query.eq('in_stock', true)
      }
      if (price_min) {
        query = query.gte('price', parseFloat(price_min))
      }
      if (price_max) {
        query = query.lte('price', parseFloat(price_max))
      }

      // Применяем сортировку
      if (sort === 'price_asc') {
        query = query.order('price', { ascending: true })
      } else if (sort === 'price_desc') {
        query = query.order('price', { ascending: false })
      } else if (sort === 'title_asc') {
        query = query.order('title', { ascending: true })
      } else if (sort === 'age_asc') {
        query = query.order('age', { ascending: true })
      } else if (sort === 'age_desc') {
        query = query.order('age', { ascending: false })
      } else if (sort === 'yearbirth_asc') {
        query = query.order('yearbirth', { ascending: true })
      } else if (sort === 'yearbirth_desc') {
        query = query.order('yearbirth', { ascending: false })
      } else if (sort === 'created_at_asc') {
        query = query.order('created_at', { ascending: true })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      // Применяем пагинацию
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error('Tea API error:', error)
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      const total = count || 0
      const totalPages = Math.ceil(total / limit)

      // Преобразуем данные, добавляя цены как массив
      const processedData = (data || []).map(tea => ({
        ...tea,
        prices: tea.tea_prices || []
      }))

      const response = {
        data: processedData,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }

      console.log('Tea API response:', { 
        itemsCount: data?.length || 0, 
        total, 
        page, 
        totalPages 
      })

      return new Response(
        JSON.stringify(response),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Tea API general error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
