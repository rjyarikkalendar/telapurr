
import { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { teaService, TeaFilters, TeaWithPrices } from '@/services/teaService';
import { TeaCard } from '@/components/TeaCard';
import { BackButton } from '@/components/BackButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Tea = () => {
  const [filters, setFilters] = useState<TeaFilters>({});
  const [activeTab, setActiveTab] = useState('all');

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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newType = value === 'all' ? undefined : value;
    const newFilters = { ...filters, type: newType };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleFilterChange = (newFilters: TeaFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const teaTypes = [
    { value: 'all', label: 'Все чаи', description: 'Вся коллекция' },
    { value: 'shen', label: 'Шен Пуэр', description: 'Сырой пуэр' },
    { value: 'shu', label: 'Шу Пуэр', description: 'Готовый пуэр' },
    { value: 'white', label: 'Белый', description: 'Белый чай' },
    { value: 'green', label: 'Зеленый', description: 'Зеленый чай' },
    { value: 'black', label: 'Красный', description: 'Красный чай' },
    { value: 'oolong', label: 'Улун', description: 'Улун' },
  ];

  const renderAdditionalFilters = () => (
    <div className="flex flex-col md:flex-row gap-4 w-full bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-7 h-auto p-1 bg-white/80 backdrop-blur-sm">
              {teaTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="flex flex-col p-3 data-[state=active]:bg-tea-brown data-[state=active]:text-white transition-all duration-200"
                >
                  <span className="font-medium text-sm">{type.label}</span>
                  <span className="text-xs opacity-70 mt-1">{type.description}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {teaTypes.map((type) => (
              <TabsContent key={type.value} value={type.value} className="space-y-6 mt-6">
                {renderAdditionalFilters()}
                
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
                          className="px-4 py-2 bg-tea-brown text-white rounded disabled:opacity-50 transition-all hover:bg-tea-brown/90"
                        >
                          Предыдущая
                        </button>
                        
                        <span className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded">
                          Страница {pagination.page} из {pagination.totalPages}
                        </span>

                        <button
                          onClick={() => updatePagination({ page: pagination.page + 1 })}
                          disabled={!pagination.hasNext}
                          className="px-4 py-2 bg-tea-brown text-white rounded disabled:opacity-50 transition-all hover:bg-tea-brown/90"
                        >
                          Следующая
                        </button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Tea;
