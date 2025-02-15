
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const Teaware = () => {
  const teawareProducts = products.filter((p) => p.category === "teaware");

  return (
    <main className="min-h-screen bg-[#D3E4E0] py-20 pb-40">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-tea-text mb-16 text-center">Чайная посуда</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teawareProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Teaware;
