
import { useApiData } from "@/hooks/useApiData";
import { teawareService, TeawareFilters, Teaware } from "@/services/teawareService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

const TeawarePage = () => {
  const { t } = useLanguage();
  
  console.log('TeawarePage rendering...');
  
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

  console.log('TeawarePage state:', { data, loading, error, pagination });

  const renderFilters = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-tea-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-tea-brown" />
        <h3 className="text-lg font-medium text-tea-text">{t.teaware?.filters?.title || 'Фильтры'}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.teaware?.filters?.material || 'Материал'}</Label>
          <Select onValueChange={(value) => updateFilters({ material: value === "all" ? undefined : value })}>
            <SelectTrigger className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg">
              <SelectValue placeholder={t.teaware?.filters?.material || "Материал"} />
            </SelectTrigger>
            <SelectContent className="bg-white border-tea-brown/20 rounded-lg shadow-xl">
              <SelectItem value="all">{t.teaware?.filters?.allMaterials || 'Все материалы'}</SelectItem>
              <SelectItem value="ceramic">{t.teaware?.materials?.ceramic || 'Керамика'}</SelectItem>
              <SelectItem value="porcelain">{t.teaware?.materials?.porcelain || 'Фарфор'}</SelectItem>
              <SelectItem value="glass">{t.teaware?.materials?.glass || 'Стекло'}</SelectItem>
              <SelectItem value="clay">{t.teaware?.materials?.clay || 'Глина'}</SelectItem>
              <SelectItem value="bamboo">{t.teaware?.materials?.bamboo || 'Бамбук'}</SelectItem>
              <SelectItem value="metal">{t.teaware?.materials?.metal || 'Металл'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 bg-tea-brown/5 p-3 rounded-lg">
          <Checkbox
            id="dishwasher_safe"
            onCheckedChange={(checked) => 
              updateFilters({ dishwasher_safe: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="dishwasher_safe" className="text-sm font-medium text-tea-text cursor-pointer">
            {t.teaware?.filters?.dishwasherSafe || 'Можно мыть в посудомойке'}
          </Label>
        </div>

        <div className="flex items-center space-x-2 bg-tea-brown/5 p-3 rounded-lg">
          <Checkbox
            id="microwave_safe"
            onCheckedChange={(checked) => 
              updateFilters({ microwave_safe: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="microwave_safe" className="text-sm font-medium text-tea-text cursor-pointer">
            {t.teaware?.filters?.microwaveSafe || 'Можно в микроволновку'}
          </Label>
        </div>

        <div className="flex items-center space-x-2 bg-tea-brown/5 p-3 rounded-lg">
          <Checkbox
            id="in_stock"
            onCheckedChange={(checked) => 
              updateFilters({ in_stock: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="in_stock" className="text-sm font-medium text-tea-text cursor-pointer">
            {t.teaware?.filters?.inStock || 'Только в наличии'}
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
            {t.categories.teaware.title}
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
