
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface BaseProduct {
  id: string;
  title: string;
  description?: string;
  price: number;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
}

interface ProductListProps<T extends BaseProduct> {
  data: T[];
  loading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange: (page: number) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  onSortChange: (sort: string) => void;
  renderFilters?: () => React.ReactNode;
  hideSearch?: boolean;
}

export function ProductList<T extends BaseProduct>({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onFilterChange,
  onSortChange,
  renderFilters,
  hideSearch = false,
}: ProductListProps<T>) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at_desc');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ title: value.trim() || undefined });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const sortOptions = [
    { value: 'created_at_desc', label: t.common.tea?.filters?.sortBy?.newest || 'Новые первыми' },
    { value: 'created_at_asc', label: t.common.tea?.filters?.sortBy?.oldest || 'Старые первыми' },
    { value: 'price_asc', label: t.common.tea?.filters?.sortBy?.priceAsc || 'Цена по возрастанию' },
    { value: 'price_desc', label: t.common.tea?.filters?.sortBy?.priceDesc || 'Цена по убыванию' },
    { value: 'title_asc', label: t.common.tea?.filters?.sortBy?.alphabetical || 'По алфавиту' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>{t.common.tea?.error || 'Ошибка загрузки данных'}: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и поиск */}
      <div className="flex flex-col gap-4">
        {!hideSearch && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t.common.tea?.filters?.search || 'Поиск по названию...'}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="rounded-full"
              />
            </div>
            <div className="w-full md:w-48">
              <div className="relative">
                <select 
                  value={sortBy} 
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-tea-brown/20"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
        
        {renderFilters && renderFilters()}
      </div>

      {/* Список продуктов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.image_url && (
              <div className="h-48 bg-gray-200">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant={item.in_stock ? "default" : "secondary"}>
                  {item.in_stock ? (t.common.tea?.filters?.inStock || 'В наличии') : (t.common.tea?.filters?.outOfStock || 'Нет в наличии')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {item.description && (
                <p className="text-gray-600 mb-3 line-clamp-3">{item.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-tea-brown">
                  {item.price.toLocaleString('ru-RU')} ₽
                </span>
                <Button size="sm">{t.common.tea?.details || 'Подробнее'}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Пагинация */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t.common.tea?.pagination?.prev || 'Предыдущая'}
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {t.common.tea?.pagination?.page || 'Страница'} {pagination.page} {t.common.tea?.pagination?.of || 'из'} {pagination.totalPages}
            </span>
            <span className="text-xs text-gray-500">
              ({t.common.tea?.pagination?.total || 'всего'} {pagination.total} {t.common.tea?.pagination?.records || 'записей'})
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
          >
            {t.common.tea?.pagination?.next || 'Следующая'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
