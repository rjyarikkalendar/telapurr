
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const Ceremonies = () => {
  const ceremonyProducts = products.filter((p) => p.category === "ceremony");

  return (
    <main className="min-h-screen bg-[#D3E4E0] py-20 pb-40">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-tea-text mb-8 text-center">
          Чайные церемонии
        </h1>
        <div className="max-w-3xl mx-auto mb-12">
          <Alert>
            <Info className="h-5 w-5" />
            <AlertDescription>
              Стоимость чая не включена в стоимость церемонии. Сорта чая выбираются 
              индивидуально в зависимости от предпочтений участников.
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ceremonyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Ceremonies;
