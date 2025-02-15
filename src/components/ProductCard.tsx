
import { Product } from "@/types/products";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Товар добавлен в корзину",
      description: product.title,
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-light text-tea-text mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-tea-brown text-lg">{product.price} ₽</span>
        <button 
          onClick={handleAddToCart}
          className="px-4 py-2 bg-tea-brown text-white rounded-md hover:bg-tea-brown/90 transition-colors"
        >
          В корзину
        </button>
      </CardFooter>
    </Card>
  );
};
