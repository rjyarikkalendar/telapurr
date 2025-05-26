
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

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
}: ProductListProps<T>) {
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
        <p>Ошибка загрузки данных: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и поиск */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at_desc">Новые первыми</SelectItem>
              <SelectItem value="created_at_asc">Старые первыми</SelectItem>
              <SelectItem value="price_asc">Цена по возрастанию</SelectItem>
              <SelectItem value="price_desc">Цена по убыванию</SelectItem>
              <SelectItem value="title_asc">По алфавиту</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                  {item.in_stock ? "В наличии" : "Нет в наличии"}
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
                <Button size="sm">Подробнее</Button>
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
            Предыдущая
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Страница {pagination.page} из {pagination.totalPages}
            </span>
            <span className="text-xs text-gray-500">
              (всего {pagination.total} записей)
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
          >
            Следующая
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
