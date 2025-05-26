
import { PaginationParams, FilterParams, ApiResponse } from './api';
import { Tables } from '@/integrations/supabase/types';

export type Teaware = Tables<'teaware'>;
export type TeawareCreate = Omit<Teaware, 'id' | 'created_at' | 'updated_at'>;
export type TeawareUpdate = Partial<TeawareCreate>;

export interface TeawareFilters extends FilterParams {
  material?: string;
  dishwasher_safe?: boolean;
  microwave_safe?: boolean;
  in_stock?: boolean;
  price_min?: number;
  price_max?: number;
  capacity_min?: number;
  capacity_max?: number;
}

export class TeawareService {
  private baseUrl = 'https://zsvcpormtqkiyijapqfa.supabase.co/functions/v1';

  async getList(
    pagination?: PaginationParams,
    filters?: TeawareFilters,
    sort?: string
  ): Promise<ApiResponse<Teaware>> {
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

    console.log('TeawareService - calling custom API with params:', params.toString());

    const response = await fetch(`${this.baseUrl}/teaware-api?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4`
      }
    });

    if (!response.ok) {
      console.error('TeawareService API error:', response.status, response.statusText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('TeawareService API response:', result);
    
    return result;
  }

  async getById(id: string): Promise<Teaware | null> {
    // Для детальной информации все еще используем прямой доступ к Supabase
    const response = await fetch(`https://zsvcpormtqkiyijapqfa.supabase.co/rest/v1/teaware?id=eq.${id}&select=*`, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdmNwb3JtdHFraXlpamFwcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzkzNjIsImV4cCI6MjA2MjgxNTM2Mn0._AlpOYclNN02L2mJblqHDnqVnR7cmlLXfy2Ras5ufX4`
      }
    });

    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  }

  async create(teaware: TeawareCreate): Promise<Teaware> {
    throw new Error('Create operation not implemented for custom API');
  }

  async update(id: string, updates: TeawareUpdate): Promise<Teaware> {
    throw new Error('Update operation not implemented for custom API');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Delete operation not implemented for custom API');
  }
}

export const teawareService = new TeawareService();
