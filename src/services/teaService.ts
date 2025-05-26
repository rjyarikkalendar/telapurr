
import { apiService, PaginationParams, FilterParams, ApiResponse } from './api';
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
  async getList(
    pagination?: PaginationParams,
    filters?: TeaFilters,
    sort?: string
  ): Promise<ApiResponse<Tea>> {
    return apiService.getList<Tea>('teas', pagination, filters, sort);
  }

  async getById(id: string): Promise<Tea | null> {
    return apiService.getById<Tea>('teas', id);
  }

  async create(tea: TeaCreate): Promise<Tea> {
    return apiService.create<Tea>('teas', tea);
  }

  async update(id: string, updates: TeaUpdate): Promise<Tea> {
    return apiService.update<Tea>('teas', id, updates);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete('teas', id);
  }
}

export const teaService = new TeaService();
