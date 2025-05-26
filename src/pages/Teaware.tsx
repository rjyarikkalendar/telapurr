
import { useApiData } from "@/hooks/useApiData";
import { teawareService, TeawareFilters, Teaware } from "@/services/teawareService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const TeawarePage = () => {
  const { currentLang } = useLanguage();
  
  const {
    data,
    loading,
    error,
    pagination,
    updatePagination,
    updateFilters,
    updateSort,
  } = useApiData<Teaware>({
    fetchFunction: teawareService.getList.bind(teawareService),
    initialPagination: { page: 1, limit: 12 },
  });

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4">
      <div className="w-48">
        <Select onValueChange={(value) => updateFilters({ material: value || undefined })}>
          <SelectTrigger>
            <SelectValue placeholder="Материал" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Все материалы</SelectItem>
            <SelectItem value="ceramic">Керамика</SelectItem>
            <SelectItem value="porcelain">Фарфор</SelectItem>
            <SelectItem value="glass">Стекло</SelectItem>
            <SelectItem value="clay">Глина</SelectItem>
            <SelectItem value="bamboo">Бамбук</SelectItem>
            <SelectItem value="metal">Металл</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="dishwasher_safe"
          onCheckedChange={(checked) => 
            updateFilters({ dishwasher_safe: checked ? true : undefined })
          }
        />
        <Label htmlFor="dishwasher_safe">Можно мыть в посудомойке</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="microwave_safe"
          onCheckedChange={(checked) => 
            updateFilters({ microwave_safe: checked ? true : undefined })
          }
        />
        <Label htmlFor="microwave_safe">Можно в микроволновку</Label>
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
            Посуда
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

export default TeawarePage;
