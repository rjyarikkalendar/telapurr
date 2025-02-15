
import { products } from "@/data/products";
import { catalogs } from "@/data/catalogs";
import { ProductCard } from "@/components/ProductCard";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tea = () => {
  const { currentLang } = useLanguage();
  const teaCatalogs = Object.values(catalogs[currentLang]).filter(cat => cat.parentId === "tea");
  
  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-light text-tea-text mb-16 text-center">
            {catalogs[currentLang].tea.title}
          </h1>
          
          <Tabs defaultValue={teaCatalogs[0].id} className="w-full">
            <TabsList className="w-full flex justify-center mb-8 bg-transparent">
              {teaCatalogs.map((catalog) => (
                <TabsTrigger
                  key={catalog.id}
                  value={catalog.id}
                  className="data-[state=active]:bg-tea-brown data-[state=active]:text-white"
                >
                  {catalog.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {teaCatalogs.map((catalog) => (
              <TabsContent key={catalog.id} value={catalog.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
