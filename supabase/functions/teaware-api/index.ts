
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
    
    // GET /teaware-api - список посуды
    if (method === 'GET') {
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '12')
      const material = url.searchParams.get('material')
      const dishwasher_safe = url.searchParams.get('dishwasher_safe')
      const microwave_safe = url.searchParams.get('microwave_safe')
      const in_stock = url.searchParams.get('in_stock')
      const price_min = url.searchParams.get('price_min')
      const price_max = url.searchParams.get('price_max')
      const capacity_min = url.searchParams.get('capacity_min')
      const capacity_max = url.searchParams.get('capacity_max')
      const sort = url.searchParams.get('sort') || 'created_at_desc'

      console.log('Teaware API - GET request with params:', {
        page, limit, material, dishwasher_safe, microwave_safe, in_stock, 
        price_min, price_max, capacity_min, capacity_max, sort
      })

      let query = supabase.from('teaware').select('*', { count: 'exact' })

      // Применяем фильтры
      if (material) {
        query = query.eq('material', material)
      }
      if (dishwasher_safe === 'true') {
        query = query.eq('dishwasher_safe', true)
      }
      if (microwave_safe === 'true') {
        query = query.eq('microwave_safe', true)
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
      if (capacity_min) {
        query = query.gte('capacity_ml', parseInt(capacity_min))
      }
      if (capacity_max) {
        query = query.lte('capacity_ml', parseInt(capacity_max))
      }

      // Применяем сортировку
      if (sort === 'price_asc') {
        query = query.order('price', { ascending: true })
      } else if (sort === 'price_desc') {
        query = query.order('price', { ascending: false })
      } else if (sort === 'title_asc') {
        query = query.order('title', { ascending: true })
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
        console.error('Teaware API error:', error)
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

      const response = {
        data: data || [],
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }

      console.log('Teaware API response:', { 
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
    console.error('Teaware API general error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
