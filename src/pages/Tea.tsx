
import { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { teaService, TeaFilters, TeaWithPrices } from '@/services/teaService';
import { ProductList } from '@/components/ProductList';
import { TeaCard } from '@/components/TeaCard';
import { BackButton } from '@/components/BackButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const Tea = () => {
  const [filters, setFilters] = useState<TeaFilters>({});

  const {
    data: teas,
    loading,
    error,
    pagination,
    updatePagination,
    updateFilters,
    updateSort,
  } = useApiData<TeaWithPrices>({
    fetchFunction: teaService.getList.bind(teaService),
    initialPagination: { page: 1, limit: 12 },
  });

  const handleFilterChange = (newFilters: TeaFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const renderFilters = () => (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1">
        <Label htmlFor="type">Тип чая</Label>
        <Select
          value={filters.type || 'all'}
          onValueChange={(value) => handleFilterChange({ ...filters, type: value === 'all' ? undefined : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Все типы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="shen">Шен</SelectItem>
            <SelectItem value="shu">Шу</SelectItem>
            <SelectItem value="green">Зеленый</SelectItem>
            <SelectItem value="black">Черный</SelectItem>
            <SelectItem value="white">Белый</SelectItem>
            <SelectItem value="oolong">Улун</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label htmlFor="kind">Вид</Label>
        <Select
          value={filters.kind || 'all'}
          onValueChange={(value) => handleFilterChange({ ...filters, kind: value === 'all' ? undefined : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Все виды" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все виды</SelectItem>
            <SelectItem value="old">Выдержанный</SelectItem>
            <SelectItem value="young">Молодой</SelectItem>
            <SelectItem value="premium">Премиум</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Label htmlFor="age">Возраст (лет)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="От"
            type="number"
            value={filters.age_min || ''}
            onChange={(e) => handleFilterChange({ 
              ...filters, 
              age_min: e.target.value ? parseInt(e.target.value) : undefined 
            })}
          />
          <Input
            placeholder="До"
            type="number"
            value={filters.age_max || ''}
            onChange={(e) => handleFilterChange({ 
              ...filters, 
              age_max: e.target.value ? parseInt(e.target.value) : undefined 
            })}
          />
        </div>
      </div>

      <div className="flex items-end">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in_stock"
            checked={filters.in_stock || false}
            onCheckedChange={(checked) => 
              handleFilterChange({ ...filters, in_stock: checked ? true : undefined })
            }
          />
          <Label htmlFor="in_stock">Только в наличии</Label>
        </div>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm pt-20 pb-40">
      <BackButton />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
          Коллекция чая
        </h1>
        
        <div className="space-y-6">
          {renderFilters()}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tea-brown"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-8">
              <p>Ошибка загрузки данных: {error.message}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teas.map((tea) => (
                  <TeaCard key={tea.id} tea={tea} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 py-6">
                  <button
                    onClick={() => updatePagination({ page: pagination.page - 1 })}
                    disabled={!pagination.hasPrev}
                    className="px-4 py-2 bg-tea-brown text-white rounded disabled:opacity-50"
                  >
                    Предыдущая
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    Страница {pagination.page} из {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => updatePagination({ page: pagination.page + 1 })}
                    disabled={!pagination.hasNext}
                    className="px-4 py-2 bg-tea-brown text-white rounded disabled:opacity-50"
                  >
                    Следующая
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Tea;
