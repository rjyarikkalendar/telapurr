
import { PaginationParams, FilterParams, ApiResponse } from './api';
import { Tables } from '@/integrations/supabase/types';

export type Tea = Tables<'teas'>;
export type TeaPrice = Tables<'tea_prices'>;
export type TeaCreate = Omit<Tea, 'id' | 'created_at' | 'updated_at'>;
export type TeaUpdate = Partial<TeaCreate>;

export interface TeaFilters extends FilterParams {
  type?: string;
  kind?: string;
  age_min?: number;
  age_max?: number;
  yearbirth_min?: number;
  yearbirth_max?: number;
  in_stock?: boolean;
  price_min?: number;
  price_max?: number;
}

export interface TeaWithPrices extends Tea {
  prices?: TeaPrice[];
  image_url?: string[] | null; // Обновляем тип для массива изображений
}

export class TeaService {
  private baseUrl = 'https://zsvcpormtqkiyijapqfa.supabase.co/functions/v1';

  async getList(
    pagination?: PaginationParams,
    filters?: TeaFilters,
    sort?: string
  ): Promise<ApiResponse<TeaWithPrices>> {
    const params = new URLSearchParams();

    // Добавляем параметры пагинации
    if (pagination?.page) {
      params.append('page', pagination.page.toString());
    }
    if (pagination?.limit) {
      params.append('limit', pagination.limit.toString());
    }

    // Добавляем фильтры
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }

    // Добавляем сортировку
    if (sort) {
      params.append('sort', sort);
    }

    console.log('TeaService - calling custom API with params:', params.toString());

    const response = await fetch(`${this.baseUrl}/tea-api?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4`
      }
    });

    if (!response.ok) {
      console.error('TeaService API error:', response.status, response.statusText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('TeaService API response:', result);
    
    return result;
  }

  async getById(id: string): Promise<TeaWithPrices | null> {
    try {
      // Получаем чай с его ценами через новую структуру
      const response = await fetch(`https://zsvcpormtqkiyijapqfa.supabase.co/rest/v1/teas?id=eq.${id}&select=*,product_sku_prices!inner(id,price_index,is_active,skus!inner(id,sku_code,weight_type,weight_value,weight_unit),prices!inner(id,price,currency))`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4`
        }
      });

      const teaData = await response.json();

      if (!teaData || teaData.length === 0) {
        return null;
      }

      const tea = teaData[0];
      
      // Преобразуем данные в формат совместимый с фронтендом
      const prices = tea.product_sku_prices?.map((psp: any) => ({
        id: psp.id,
        weight_type: psp.skus.weight_type,
        price: psp.prices.price,
        price_index: psp.price_index,
        tea_id: tea.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })).sort((a: any, b: any) => a.price_index - b.price_index) || [];

      // Находим минимальную цену
      const minPrice = prices.length > 0 ? Math.min(...prices.map((p: any) => p.price)) : tea.price || 0;

      return {
        ...tea,
        price: minPrice,
        prices: prices,
        product_sku_prices: undefined
      };
    } catch (error) {
      console.error('Error fetching tea by id:', error);
      return null;
    }
  }

  async create(tea: TeaCreate): Promise<Tea> {
    throw new Error('Create operation not implemented for custom API');
  }

  async update(id: string, updates: TeaUpdate): Promise<Tea> {
    throw new Error('Update operation not implemented for custom API');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Delete operation not implemented for custom API');
  }
}

export const teaService = new TeaService();
