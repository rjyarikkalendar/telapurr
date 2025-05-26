
import { useApiData } from "@/hooks/useApiData";
import { teaService, TeaFilters } from "@/services/teaService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Tea = () => {
  const { currentLang } = useLanguage();
  
  const {
    data,
    loading,
    error,
    pagination,
    updatePagination,
    updateFilters,
    updateSort,
  } = useApiData({
    fetchFunction: teaService.getList.bind(teaService),
    initialPagination: { page: 1, limit: 12 },
  });

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4">
      <div className="w-48">
        <Select onValueChange={(value) => updateFilters({ tea_type: value || undefined })}>
          <SelectTrigger>
            <SelectValue placeholder="Тип чая" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Все типы</SelectItem>
            <SelectItem value="green">Зеленый</SelectItem>
            <SelectItem value="black">Черный</SelectItem>
            <SelectItem value="white">Белый</SelectItem>
            <SelectItem value="oolong">Улун</SelectItem>
            <SelectItem value="pu_erh">Пуэр</SelectItem>
            <SelectItem value="herbal">Травяной</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-48">
        <Select onValueChange={(value) => updateFilters({ caffeine_level: value || undefined })}>
          <SelectTrigger>
            <SelectValue placeholder="Уровень кофеина" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Любой</SelectItem>
            <SelectItem value="none">Без кофеина</SelectItem>
            <SelectItem value="low">Низкий</SelectItem>
            <SelectItem value="medium">Средний</SelectItem>
            <SelectItem value="high">Высокий</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="in_stock"
          onCheckedChange={(checked) => 
            updateFilters({ in_stock: checked ? true : undefined })
          }
        />
        <Label htmlFor="in_stock">Только в наличии</Label>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
            Чай
          </h1>
          
          <ProductList
            data={data}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={(page) => updatePagination({ page })}
            onFilterChange={updateFilters}
            onSortChange={updateSort}
            renderFilters={renderFilters}
          />
        </div>
      </main>
    </div>
  );
};

export default Tea;
