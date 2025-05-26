
import { apiService, PaginationParams, FilterParams, ApiResponse } from './api';
import { Tables } from '@/integrations/supabase/types';

export type TeaSet = Tables<'tea_sets'>;
export type TeaSetCreate = Omit<TeaSet, 'id' | 'created_at' | 'updated_at'>;
export type TeaSetUpdate = Partial<TeaSetCreate>;

export interface TeaSetFilters extends FilterParams {
  gift_packaging?: boolean;
  in_stock?: boolean;
  price_min?: number;
  price_max?: number;
  serves_people_min?: number;
  serves_people_max?: number;
}

export class TeaSetService {
  async getList(
    pagination?: PaginationParams,
    filters?: TeaSetFilters,
    sort?: string
  ): Promise<ApiResponse<TeaSet>> {
    return apiService.getList<TeaSet>('tea_sets', pagination, filters, sort);
  }

  async getById(id: string): Promise<TeaSet | null> {
    return apiService.getById<TeaSet>('tea_sets', id);
  }

  async create(teaSet: TeaSetCreate): Promise<TeaSet> {
    return apiService.create<TeaSet>('tea_sets', teaSet);
  }

  async update(id: string, updates: TeaSetUpdate): Promise<TeaSet> {
    return apiService.update<TeaSet>('tea_sets', id, updates);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete('tea_sets', id);
  }
}

export const teaSetService = new TeaSetService();
