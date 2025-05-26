
import { useApiData } from "@/hooks/useApiData";
import { teawareService, TeawareFilters, Teaware } from "@/services/teawareService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-tea-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-tea-brown" />
        <h3 className="text-sm font-medium text-tea-text">{t.teaware?.filters?.title || 'Фильтры'}</h3>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-tea-text">{t.teaware?.filters?.type || 'Тип'}:</label>
          <div className="flex flex-wrap gap-1">
            {[
              { value: 'all', label: t.teaware?.types?.all || 'Все' },
              { value: 'chabu', label: t.teaware?.types?.chabu || 'Чабань' },
              { value: 'set', label: t.teaware?.types?.set || 'Набор посуды' },
              { value: 'cups', label: t.teaware?.types?.cups || 'Пиалы' },
              { value: 'teapots', label: t.teaware?.types?.teapots || 'Типоды и чайники' },
              { value: 'gaiwan', label: t.teaware?.types?.gaiwan || 'Гайвань' },
              { value: 'pets', label: t.teaware?.types?.pets || 'Питомцы и чайные игрушки' },
              { value: 'siphon', label: t.teaware?.types?.siphon || 'Сифон' },
              { value: 'fairness_cups', label: t.teaware?.types?.fairnessCups || 'Чаши справедливости' },
              { value: 'thermos', label: t.teaware?.types?.thermos || 'Термосы' },
              { value: 'other', label: t.teaware?.types?.other || 'Другое' }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => updateFilters({ type: type.value === "all" ? undefined : type.value })}
                className="px-3 py-1 text-xs bg-tea-brown/10 hover:bg-tea-brown/20 rounded-full transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
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
            {t.teaware?.filters?.inStock || 'В наличии'}
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
            hideSearch={true}
          />
        </div>
      </main>
    </div>
  );
};

export default TeawarePage;
