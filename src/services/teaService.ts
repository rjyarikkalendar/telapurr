
import { PaginationParams, FilterParams, ApiResponse } from './api';
import { Tables } from '@/integrations/supabase/types';

export type Tea = Tables<'teas'>;
export type TeaCreate = Omit<Tea, 'id' | 'created_at' | 'updated_at'>;
export type TeaUpdate = Partial<TeaCreate>;

export interface TeaFilters extends FilterParams {
  tea_type?: string;
  origin_country?: string;
  caffeine_level?: string;
  in_stock?: boolean;
  price_min?: number;
  price_max?: number;
}

export class TeaService {
  private baseUrl = 'https://zsvcpormtqkiyijapqfa.supabase.co/functions/v1';

  async getList(
    pagination?: PaginationParams,
    filters?: TeaFilters,
    sort?: string
  ): Promise<ApiResponse<Tea>> {
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

  async getById(id: string): Promise<Tea | null> {
    // Для детальной информации все еще используем прямой доступ к Supabase
    const response = await fetch(`https://zsvcpormtqkiyijapqfa.supabase.co/rest/v1/teas?id=eq.${id}&select=*`, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4`
      }
    });

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
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
