
import { apiService, PaginationParams, FilterParams, ApiResponse } from './api';
import { Tables } from '@/integrations/supabase/types';

export type Profile = Tables<'profiles'>;
export type ProfileCreate = Omit<Profile, 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<ProfileCreate>;

export interface ProfileFilters extends FilterParams {
  email?: string;
  full_name?: string;
  created_at_min?: string;
  created_at_max?: string;
  updated_at_min?: string;
  updated_at_max?: string;
}

export class ProfileService {
  async getList(
    pagination?: PaginationParams,
    filters?: ProfileFilters,
    sort?: string
  ): Promise<ApiResponse<Profile>> {
    return apiService.getList<Profile>('profiles', pagination, filters, sort);
  }

  async getById(id: string): Promise<Profile | null> {
    return apiService.getById<Profile>('profiles', id);
  }

  async create(profile: ProfileCreate): Promise<Profile> {
    return apiService.create<Profile>('profiles', profile);
  }

  async update(id: string, updates: ProfileUpdate): Promise<Profile> {
    return apiService.update<Profile>('profiles', id, updates);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete('profiles', id);
  }
}

export const profileService = new ProfileService();
