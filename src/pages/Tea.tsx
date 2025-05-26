
import { useState } from 'react';
import { useApiData } from '@/hooks/useApiData';
import { teaService, TeaFilters, TeaWithPrices } from '@/services/teaService';
import { TeaCard } from '@/components/TeaCard';
import { BackButton } from '@/components/BackButton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Tea = () => {
  const [filters, setFilters] = useState<TeaFilters>({});
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLanguage();

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
    { value: 'all', label: t.tea?.categories?.all || 'Все чаи' },
    { value: 'shen', label: t.tea?.categories?.shen || 'Шен Пуэр' },
    { value: 'shu', label: t.tea?.categories?.shu || 'Шу Пуэр' },
    { value: 'white', label: t.tea?.categories?.white || 'Белый' },
    { value: 'gabba', label: t.tea?.categories?.gabba || 'Габба' },
    { value: 'red', label: t.tea?.categories?.red || 'Красные улуны' },
    { value: 'green', label: t.tea?.categories?.green || 'Зеленые улуны' },
  ];

  const renderCompactFilters = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-tea-brown/10 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-tea-text">{t.tea?.filters?.age || 'Возраст'}:</label>
          <Input
            placeholder={t.tea?.filters?.from || "От"}
            type="number"
            value={filters.age_min || ''}
            onChange={(e) => handleFilterChange({ 
              ...filters, 
              age_min: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="w-16 h-8 text-xs"
          />
          <span className="text-xs text-gray-400">-</span>
          <Input
            placeholder={t.tea?.filters?.to || "До"}
            type="number"
            value={filters.age_max || ''}
            onChange={(e) => handleFilterChange({ 
              ...filters, 
              age_max: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="w-16 h-8 text-xs"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="in_stock"
            checked={filters.in_stock || false}
            onCheckedChange={(checked) => 
              handleFilterChange({ ...filters, in_stock: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <label htmlFor="in_stock" className="text-xs font-medium text-tea-text cursor-pointer">
            {t.tea?.filters?.inStock || 'В наличии'}
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSort('price_asc')}
            className="px-3 py-1 text-xs bg-tea-brown/10 hover:bg-tea-brown/20 rounded-lg transition-colors"
          >
            {t.tea?.filters?.sortBy?.priceAsc || 'Цена ↑'}
          </button>
          <button
            onClick={() => updateSort('price_desc')}
            className="px-3 py-1 text-xs bg-tea-brown/10 hover:bg-tea-brown/20 rounded-lg transition-colors"
          >
            {t.tea?.filters?.sortBy?.priceDesc || 'Цена ↓'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm pt-20 pb-40">
      <BackButton />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
          {t.categories.tea.title}
        </h1>
        
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-7 h-12 p-1 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
              {teaTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="text-sm font-medium data-[state=active]:bg-tea-brown data-[state=active]:text-white transition-all duration-200 rounded-lg"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {teaTypes.map((type) => (
              <TabsContent key={type.value} value={type.value} className="space-y-6 mt-6">
                {renderCompactFilters()}
                
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tea-brown"></div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-600 p-8">
                    <p>{t.tea?.error || 'Ошибка загрузки данных'}: {error.message}</p>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePagination({ page: pagination.page - 1 })}
                          disabled={!pagination.hasPrev}
                          className="flex items-center gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          {t.tea?.pagination?.prev || 'Предыдущая'}
                        </Button>
                        
                        <span className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                          {t.tea?.pagination?.page || 'Страница'} {pagination.page} {t.tea?.pagination?.of || 'из'} {pagination.totalPages}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePagination({ page: pagination.page + 1 })}
                          disabled={!pagination.hasNext}
                          className="flex items-center gap-2"
                        >
                          {t.tea?.pagination?.next || 'Следующая'}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
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
