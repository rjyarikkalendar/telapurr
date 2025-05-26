
import { useState, useEffect } from 'react';
import { PaginationParams, FilterParams, ApiResponse } from '@/services/api';

interface UseApiDataOptions<T> {
  fetchFunction: (
    pagination?: PaginationParams,
    filters?: FilterParams,
    sort?: string
  ) => Promise<ApiResponse<T>>;
  initialPagination?: PaginationParams;
  initialFilters?: FilterParams;
  initialSort?: string;
}

export function useApiData<T>({
  fetchFunction,
  initialPagination = { page: 1, limit: 20 },
  initialFilters = {},
  initialSort = '',
}: UseApiDataOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState(initialPagination);
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction(pagination, filters, sort);
      setData(response.data);
      setPaginationMeta(response.pagination);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, filters, sort]);

  const updatePagination = (newPagination: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Сбрасываем на первую страницу при изменении фильтров
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updateSort = (newSort: string) => {
    setSort(newSort);
    // Сбрасываем на первую страницу при изменении сортировки
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    pagination: paginationMeta,
    updatePagination,
    updateFilters,
    updateSort,
    refresh,
  };
}
