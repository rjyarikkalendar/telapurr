
import { useApiData } from "@/hooks/useApiData";
import { teaSetService, TeaSetFilters, TeaSet } from "@/services/teaSetService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

const SetsPage = () => {
  const { t } = useLanguage();
  
  const {
    data,
    loading,
    error,
    pagination,
    updatePagination,
    updateFilters,
    updateSort,
  } = useApiData<TeaSet>({
    fetchFunction: teaSetService.getList.bind(teaSetService),
    initialPagination: { page: 1, limit: 12 },
  });

  const renderFilters = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-tea-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-tea-brown" />
        <h3 className="text-sm font-medium text-tea-text">{t.sets?.filters?.title || 'Фильтры'}</h3>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-tea-text">{t.sets?.filters?.people || 'Людей'}:</label>
          <div className="flex gap-1">
            {[
              { value: '', label: t.sets?.filters?.anyAmount || 'Все' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '4', label: '4+' },
              { value: '6', label: '6+' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const numValue = option.value ? parseInt(option.value) : undefined;
                  updateFilters({ serves_people_min: numValue });
                }}
                className="px-3 py-1 text-xs bg-tea-brown/10 hover:bg-tea-brown/20 rounded-full transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="gift_packaging"
            onCheckedChange={(checked) => 
              updateFilters({ gift_packaging: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="gift_packaging" className="text-xs font-medium text-tea-text cursor-pointer">
            {t.sets?.filters?.giftPackaging || 'Подарочная упаковка'}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="in_stock"
            onCheckedChange={(checked) => 
              updateFilters({ in_stock: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="in_stock" className="text-xs font-medium text-tea-text cursor-pointer">
            {t.sets?.filters?.inStock || 'В наличии'}
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
            {t.categories.sets.title}
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
            hideSearch={true}
          />
        </div>
      </main>
    </div>
  );
};

export default SetsPage;
