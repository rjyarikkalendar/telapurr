
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
import { useLanguage } from '@/hooks/use-language';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

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
    { value: 'all', label: t.tea?.categories?.all || 'Все чаи', description: t.tea?.categories?.allDesc || 'Вся коллекция' },
    { value: 'shen', label: t.tea?.categories?.shen || 'Шен Пуэр', description: t.tea?.categories?.shenDesc || 'Сырой пуэр' },
    { value: 'shu', label: t.tea?.categories?.shu || 'Шу Пуэр', description: t.tea?.categories?.shuDesc || 'Готовый пуэр' },
    { value: 'white', label: t.tea?.categories?.white || 'Белый', description: t.tea?.categories?.whiteDesc || 'Белый чай' },
    { value: 'green', label: t.tea?.categories?.green || 'Зеленый', description: t.tea?.categories?.greenDesc || 'Зеленый чай' },
    { value: 'black', label: t.tea?.categories?.black || 'Красный', description: t.tea?.categories?.blackDesc || 'Красный чай' },
    { value: 'oolong', label: t.tea?.categories?.oolong || 'Улун', description: t.tea?.categories?.oolongDesc || 'Улун' },
  ];

  const renderAdditionalFilters = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-tea-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-tea-brown" />
        <h3 className="text-lg font-medium text-tea-text">{t.tea?.filters?.title || 'Фильтры'}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.tea?.filters?.kind || 'Вид'}</Label>
          <div className="relative">
            <Select
              value={filters.kind || 'all'}
              onValueChange={(value) => handleFilterChange({ ...filters, kind: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg">
                <SelectValue placeholder={t.tea?.filters?.allKinds || "Все виды"} />
              </SelectTrigger>
              <SelectContent className="bg-white border-tea-brown/20 rounded-lg shadow-xl">
                <SelectItem value="all">{t.tea?.filters?.allKinds || 'Все виды'}</SelectItem>
                <SelectItem value="old">{t.tea?.filters?.aged || 'Выдержанный'}</SelectItem>
                <SelectItem value="young">{t.tea?.filters?.young || 'Молодой'}</SelectItem>
                <SelectItem value="premium">{t.tea?.filters?.premium || 'Премиум'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.tea?.filters?.age || 'Возраст (лет)'}</Label>
          <div className="flex gap-2">
            <Input
              placeholder={t.tea?.filters?.from || "От"}
              type="number"
              value={filters.age_min || ''}
              onChange={(e) => handleFilterChange({ 
                ...filters, 
                age_min: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg"
            />
            <Input
              placeholder={t.tea?.filters?.to || "До"}
              type="number"
              value={filters.age_max || ''}
              onChange={(e) => handleFilterChange({ 
                ...filters, 
                age_max: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.tea?.filters?.sort || 'Сортировка'}</Label>
          <Select onValueChange={(value) => updateSort({ field: 'price', direction: value as 'asc' | 'desc' })}>
            <SelectTrigger className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg">
              <SelectValue placeholder={t.tea?.filters?.sortBy || "Сортировать по"} />
            </SelectTrigger>
            <SelectContent className="bg-white border-tea-brown/20 rounded-lg shadow-xl">
              <SelectItem value="asc">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  {t.tea?.filters?.priceAsc || 'Цена: по возрастанию'}
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center gap-2">
                  <SortDesc className="h-4 w-4" />
                  {t.tea?.filters?.priceDesc || 'Цена: по убыванию'}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <div className="flex items-center space-x-2 bg-tea-brown/5 p-3 rounded-lg">
            <Checkbox
              id="in_stock"
              checked={filters.in_stock || false}
              onCheckedChange={(checked) => 
                handleFilterChange({ ...filters, in_stock: checked ? true : undefined })
              }
              className="border-tea-brown data-[state=checked]:bg-tea-brown"
            />
            <Label htmlFor="in_stock" className="text-sm font-medium text-tea-text cursor-pointer">
              {t.tea?.filters?.inStock || 'Только в наличии'}
            </Label>
          </div>
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
            <TabsList className="grid w-full grid-cols-7 h-auto p-1 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              {teaTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="flex flex-col p-3 data-[state=active]:bg-tea-brown data-[state=active]:text-white transition-all duration-200 rounded-lg"
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
                        <button
                          onClick={() => updatePagination({ page: pagination.page - 1 })}
                          disabled={!pagination.hasPrev}
                          className="px-6 py-2 bg-tea-brown text-white rounded-lg disabled:opacity-50 transition-all hover:bg-tea-brown/90 shadow-md"
                        >
                          {t.tea?.pagination?.prev || 'Предыдущая'}
                        </button>
                        
                        <span className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                          {t.tea?.pagination?.page || 'Страница'} {pagination.page} {t.tea?.pagination?.of || 'из'} {pagination.totalPages}
                        </span>

                        <button
                          onClick={() => updatePagination({ page: pagination.page + 1 })}
                          disabled={!pagination.hasNext}
                          className="px-6 py-2 bg-tea-brown text-white rounded-lg disabled:opacity-50 transition-all hover:bg-tea-brown/90 shadow-md"
                        >
                          {t.tea?.pagination?.next || 'Следующая'}
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
