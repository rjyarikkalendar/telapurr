
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const Tea = () => {
  const teaProducts = products.filter((p) => p.category === "tea");

  return (
    <main className="min-h-screen bg-tea-bg py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-tea-text mb-16 text-center">Коллекция чая</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teaProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tea;
