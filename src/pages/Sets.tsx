
import { useApiData } from "@/hooks/useApiData";
import { teaSetService, TeaSetFilters, TeaSet } from "@/services/teaSetService";
import { ProductList } from "@/components/ProductList";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-tea-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-tea-brown" />
        <h3 className="text-lg font-medium text-tea-text">{t.sets?.filters?.title || 'Фильтры'}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.sets?.filters?.people || 'Количество человек'}</Label>
          <Select onValueChange={(value) => {
            const numValue = value ? parseInt(value) : undefined;
            updateFilters({ serves_people_min: numValue });
          }}>
            <SelectTrigger className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg">
              <SelectValue placeholder={t.sets?.filters?.people || "Количество человек"} />
            </SelectTrigger>
            <SelectContent className="bg-white border-tea-brown/20 rounded-lg shadow-xl">
              <SelectItem value="">{t.sets?.filters?.anyAmount || 'Любое количество'}</SelectItem>
              <SelectItem value="1">{t.sets?.filters?.onePlus || '1+ человек'}</SelectItem>
              <SelectItem value="2">{t.sets?.filters?.twoPlus || '2+ человека'}</SelectItem>
              <SelectItem value="4">{t.sets?.filters?.fourPlus || '4+ человека'}</SelectItem>
              <SelectItem value="6">{t.sets?.filters?.sixPlus || '6+ человек'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.sets?.filters?.priceFrom || 'Цена от'}</Label>
          <Input
            type="number"
            placeholder={t.sets?.filters?.priceFrom || "Цена от"}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : undefined;
              updateFilters({ price_min: value });
            }}
            className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-tea-text">{t.sets?.filters?.priceTo || 'Цена до'}</Label>
          <Input
            type="number"
            placeholder={t.sets?.filters?.priceTo || "Цена до"}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : undefined;
              updateFilters({ price_max: value });
            }}
            className="bg-white border-tea-brown/20 focus:border-tea-brown rounded-lg"
          />
        </div>

        <div className="flex items-center space-x-2 bg-tea-brown/5 p-3 rounded-lg">
          <Checkbox
            id="gift_packaging"
            onCheckedChange={(checked) => 
              updateFilters({ gift_packaging: checked ? true : undefined })
            }
            className="border-tea-brown data-[state=checked]:bg-tea-brown"
          />
          <Label htmlFor="gift_packaging" className="text-sm font-medium text-tea-text cursor-pointer">
            {t.sets?.filters?.giftPackaging || 'Подарочная упаковка'}
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
            {t.sets?.filters?.inStock || 'Только в наличии'}
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
          />
        </div>
      </main>
    </div>
  );
};

export default SetsPage;
