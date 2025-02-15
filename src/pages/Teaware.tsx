
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/hooks/use-language";

const Teaware = () => {
  const { currentLang, t } = useLanguage();
  const teawareProducts = products.filter((p) => p.category === "teaware");

  return (
    <div className="flex flex-col min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm">
      <BackButton />
      <main className="flex-grow pt-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-light text-tea-text mb-16 text-center">
            {t.categories.teaware.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teawareProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teaware;
