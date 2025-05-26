
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

      // Получаем чаи с их ценами через новую структуру
      let query = supabase
        .from('teas')
        .select(`
          *,
          product_sku_prices!inner(
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
          )
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

      // Фильтры для связанных таблиц
      query = query.eq('product_sku_prices.product_type', 'tea')
      query = query.eq('product_sku_prices.is_active', true)

      // Применяем сортировку
      if (sort === 'price_asc' || sort === 'price_desc') {
        // Для сортировки по цене сначала получим данные, потом отсортируем
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

      // Группируем данные по чаям и обрабатываем цены
      const teaMap = new Map()
      
      if (data) {
        for (const row of data) {
          const teaId = row.id
          
          if (!teaMap.has(teaId)) {
            teaMap.set(teaId, {
              ...row,
              prices: [],
              product_sku_prices: undefined
            })
          }
          
          const tea = teaMap.get(teaId)
          
          // Добавляем цены если есть product_sku_prices
          if (row.product_sku_prices && Array.isArray(row.product_sku_prices)) {
            for (const psp of row.product_sku_prices) {
              tea.prices.push({
                id: psp.id,
                weight_type: psp.skus.weight_type,
                price: psp.prices.price,
                price_index: psp.price_index,
                tea_id: tea.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
            }
          }
        }
      }

      let processedData = Array.from(teaMap.values())

      // Обрабатываем каждый чай
      processedData = processedData.map(tea => {
        // Сортируем цены по price_index
        tea.prices.sort((a, b) => a.price_index - b.price_index)
        
        // Фильтрация по цене
        if (price_min || price_max) {
          const prices = tea.prices.filter(p => {
            if (price_min && p.price < parseFloat(price_min)) return false
            if (price_max && p.price > parseFloat(price_max)) return false
            return true
          })
          if (prices.length === 0) return null // Исключаем чай если нет подходящих цен
          tea.prices = prices
        }

        // Находим минимальную цену для отображения
        const minPrice = tea.prices.length > 0 ? Math.min(...tea.prices.map(p => p.price)) : tea.price || 0
        tea.price = minPrice

        return tea
      }).filter(tea => tea !== null) // Убираем null значения

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
