
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

      // Получаем чаи с их ценами через правильные внешние ключи
      let query = supabase
        .from('teas')
        .select(`
          *
        `, { count: 'exact' })

      // Применяем фильтры к чаям
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

      // Применяем сортировку для основного запроса
      if (sort === 'title_asc') {
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

      const { data: teasData, error: teasError, count } = await query

      if (teasError) {
        console.error('Tea API error:', teasError)
        return new Response(
          JSON.stringify({ error: teasError.message }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      // Получаем цены для каждого чая отдельным запросом
      const processedData = []
      
      if (teasData && teasData.length > 0) {
        for (const tea of teasData) {
          // Получаем цены и SKU для каждого чая
          const { data: priceData, error: priceError } = await supabase
            .from('product_sku_prices')
            .select(`
              id,
              price_index,
              is_active,
              skus!inner(
                id,
                sku_code,
                weight_type,
                weight_value,
                weight_unit
              ),
              prices!inner(
                id,
                price,
                currency
              )
            `)
            .eq('product_id', tea.id)
            .eq('product_type', 'tea')
            .eq('is_active', true)
            .order('price_index', { ascending: true })

          if (priceError) {
            console.error('Price fetch error for tea:', tea.id, priceError)
            continue
          }

          // Преобразуем данные в формат совместимый с фронтендом
          const prices = priceData?.map(psp => ({
            id: psp.id,
            weight_type: psp.skus.weight_type,
            price: psp.prices.price,
            price_index: psp.price_index,
            tea_id: tea.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })) || []

          // Фильтрация по цене
          let filteredPrices = prices
          if (price_min || price_max) {
            filteredPrices = prices.filter(p => {
              if (price_min && p.price < parseFloat(price_min)) return false
              if (price_max && p.price > parseFloat(price_max)) return false
              return true
            })
            if (filteredPrices.length === 0) continue // Исключаем чай если нет подходящих цен
          }

          // Находим минимальную цену для отображения
          const minPrice = filteredPrices.length > 0 ? Math.min(...filteredPrices.map(p => p.price)) : tea.price || 0

          processedData.push({
            ...tea,
            price: minPrice,
            prices: filteredPrices
          })
        }
      }

      // Сортировка по цене если нужно
      if (sort === 'price_asc') {
        processedData.sort((a, b) => a.price - b.price)
      } else if (sort === 'price_desc') {
        processedData.sort((a, b) => b.price - a.price)
      }

      const total = processedData.length
      const totalPages = Math.ceil(total / limit)

      // Применяем пагинацию
      const from = (page - 1) * limit
      const to = from + limit
      const paginatedData = processedData.slice(from, to)

      const response = {
        data: paginatedData,
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
        itemsCount: paginatedData.length, 
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
