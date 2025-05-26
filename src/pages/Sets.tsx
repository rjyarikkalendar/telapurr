
import { useApiData } from "@/hooks/useApiData";
import { teaSetService, TeaSetFilters } from "@/services/teaSetService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Sets = () => {
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
    fetchFunction: teaSetService.getList.bind(teaSetService),
    initialPagination: { page: 1, limit: 12 },
  });

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4">
      <div className="w-48">
        <Select onValueChange={(value) => {
          const numValue = value ? parseInt(value) : undefined;
          updateFilters({ serves_people_min: numValue });
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Количество человек" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Любое количество</SelectItem>
            <SelectItem value="1">1 человек</SelectItem>
            <SelectItem value="2">2+ человека</SelectItem>
            <SelectItem value="4">4+ человека</SelectItem>
            <SelectItem value="6">6+ человек</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="gift_packaging"
          onCheckedChange={(checked) => 
            updateFilters({ gift_packaging: checked ? true : undefined })
          }
        />
        <Label htmlFor="gift_packaging">Подарочная упаковка</Label>
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
            Чайные наборы
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

export default Sets;
