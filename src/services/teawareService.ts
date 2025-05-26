
import { apiService, PaginationParams, FilterParams, ApiResponse } from './api';
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
  async getList(
    pagination?: PaginationParams,
    filters?: TeawareFilters,
    sort?: string
  ): Promise<ApiResponse<Teaware>> {
    return apiService.getList<Teaware>('teaware', pagination, filters, sort);
  }

  async getById(id: string): Promise<Teaware | null> {
    return apiService.getById<Teaware>('teaware', id);
  }

  async create(teaware: TeawareCreate): Promise<Teaware> {
    return apiService.create<Teaware>('teaware', teaware);
  }

  async update(id: string, updates: TeawareUpdate): Promise<Teaware> {
    return apiService.update<Teaware>('teaware', id, updates);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete('teaware', id);
  }
}

export const teawareService = new TeawareService();
