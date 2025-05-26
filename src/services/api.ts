
import { supabase } from "@/integrations/supabase/client";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  [key: string]: any;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

type TableName = 'teas' | 'teaware' | 'tea_sets' | 'profiles';

class ApiService {
  private buildQuery(
    table: TableName,
    pagination?: PaginationParams,
    filters?: FilterParams,
    sort?: SortParams[]
  ) {
    let query: any = supabase.from(table).select('*', { count: 'exact' });

    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key.endsWith('_min')) {
            const field = key.replace('_min', '');
            query = query.gte(field, value);
          } else if (key.endsWith('_max')) {
            const field = key.replace('_max', '');
            query = query.lte(field, value);
          } else if (typeof value === 'string' && (key === 'title' || key === 'full_name')) {
            query = query.ilike(key, `%${value}%`);
          } else {
            query = query.eq(key, value);
          }
        }
      });
    }

    // Apply sorting
    if (sort && sort.length > 0) {
      sort.forEach(({ field, direction }) => {
        query = query.order(field, { ascending: direction === 'asc' });
      });
    } else {
      // Default sorting
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (pagination) {
      const { page = 1, limit = 20 } = pagination;
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    return query;
  }

  private parseSortString(sortString?: string): SortParams[] {
    if (!sortString) return [];
    
    const sortItems: SortParams[] = [];
    const items = sortString.split(',');
    
    for (const item of items) {
      const trimmed = item.trim();
      if (trimmed.endsWith('_desc')) {
        sortItems.push({ field: trimmed.replace('_desc', ''), direction: 'desc' });
      } else if (trimmed.endsWith('_asc')) {
        sortItems.push({ field: trimmed.replace('_asc', ''), direction: 'asc' });
      } else {
        sortItems.push({ field: trimmed, direction: 'asc' });
      }
    }
    
    return sortItems;
  }

  async getList<T = any>(
    table: TableName,
    pagination?: PaginationParams,
    filters?: FilterParams,
    sortString?: string
  ): Promise<ApiResponse<T>> {
    const sort = this.parseSortString(sortString);
    const query = this.buildQuery(table, pagination, filters, sort);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error(`Error fetching ${table}:`, error);
      throw error;
    }

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: (data || []) as T[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getById<T = any>(table: TableName, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching ${table} by id:`, error);
      throw error;
    }

    return data as T | null;
  }

  async create<T = any>(table: TableName, item: any): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error(`Error creating ${table}:`, error);
      throw error;
    }

    return data as T;
  }

  async update<T = any>(table: TableName, id: string, updates: any): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }

    return data as T;
  }

  async delete(table: TableName, id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting ${table}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
