
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
    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase client is not initialized');
    }

    let query: any = supabase.from(table).select('*', { count: 'exact' });

    console.log(`Building query for table: ${table}`);
    console.log('Filters:', filters);
    console.log('Sort:', sort);
    console.log('Pagination:', pagination);

    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          console.log(`Applying filter: ${key} = ${value}`);
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
        console.log(`Applying sort: ${field} ${direction}`);
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
      console.log(`Applying pagination: from ${from} to ${to}`);
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
    try {
      console.log(`Starting getList for table: ${table}`);
      console.log('Supabase client status:', !!supabase);
      
      const sort = this.parseSortString(sortString);
      const query = this.buildQuery(table, pagination, filters, sort);
      
      console.log('Executing query...');
      const { data, error, count } = await query;
      
      if (error) {
        console.error(`Error fetching ${table}:`, error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log(`Query successful. Got ${data?.length || 0} records, total count: ${count}`);

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
    } catch (error) {
      console.error(`Failed to fetch ${table}:`, error);
      throw error;
    }
  }

  async getById<T = any>(table: TableName, id: string): Promise<T | null> {
    try {
      console.log(`Getting ${table} by id: ${id}`);
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
    } catch (error) {
      console.error(`Failed to fetch ${table} by id:`, error);
      throw error;
    }
  }

  async create<T = any>(table: TableName, item: any): Promise<T> {
    try {
      console.log(`Creating ${table}:`, item);
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
    } catch (error) {
      console.error(`Failed to create ${table}:`, error);
      throw error;
    }
  }

  async update<T = any>(table: TableName, id: string, updates: any): Promise<T> {
    try {
      console.log(`Updating ${table} ${id}:`, updates);
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
    } catch (error) {
      console.error(`Failed to update ${table}:`, error);
      throw error;
    }
  }

  async delete(table: TableName, id: string): Promise<void> {
    try {
      console.log(`Deleting ${table} ${id}`);
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting ${table}:`, error);
        throw error;
      }
    } catch (error) {
      console.error(`Failed to delete ${table}:`, error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
