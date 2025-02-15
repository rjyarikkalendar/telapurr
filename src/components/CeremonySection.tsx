import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface CeremonySectionProps {
  t: {
    ceremonies: {
      title: string;
      description: string;
    };
  };
}

export const CeremonySection = ({ t }: CeremonySectionProps) => {
  return (
    <section className="pb-10 bg-[#B8A99B] relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center text-white mb-8 font-light font-playfair">
          {t.ceremonies.title}
        </h2>
        <p className="text-lg text-center text-cream max-w-2xl mx-auto mb-12 font-cormorant">
          {t.ceremonies.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products
            .filter((product) => product.category === "ceremony")
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};
