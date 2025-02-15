
import { products } from "@/data/products";
import { catalogs } from "@/data/catalogs";
import { ProductCard } from "@/components/ProductCard";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

const Tea = () => {
  const { currentLang } = useLanguage();
  const teaCatalogs = Object.values(catalogs[currentLang]).filter(cat => cat.parentId === "tea");
  
  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-2 mb-8">
            <img
              src="/lovable-uploads/a014fe1e-efdf-4460-b58b-605bd8addaf6.png"
              alt="Milena Asia Tea"
              className="w-24 h-24 object-contain"
            />
            <h1 className="text-4xl font-light text-tea-text text-center">
              {catalogs[currentLang].tea.title}
            </h1>
          </div>
          
          <Tabs defaultValue={teaCatalogs[0].id} className="w-full">
            <div className="relative">
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <TabsList className="w-max flex space-x-2 bg-transparent">
                  {teaCatalogs.map((catalog) => (
                    <TabsTrigger
                      key={catalog.id}
                      value={catalog.id}
                      className="data-[state=active]:bg-tea-brown data-[state=active]:text-white whitespace-nowrap px-4"
                    >
                      {catalog.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-[#D3E4E0]/50 to-transparent pointer-events-none">
                <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-tea-brown/70" />
              </div>
            </div>

            {teaCatalogs.map((catalog) => (
              <TabsContent key={catalog.id} value={catalog.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {products
                    .filter((p) => p.catalogId === catalog.id)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Tea;
