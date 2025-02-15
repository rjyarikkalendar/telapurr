
import { useState } from "react";
import { Product } from "@/types/products";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  const { addItem, removeItem } = useCart();
  const sizes = product.category === 'tea' ? [25, 50, 100, 200, 350] : undefined;

  const handleAddToCart = (size?: number) => {
    addItem(product, size);
    setOpen(false);
    toast({
      title: "Товар добавлен в корзину",
      description: (
        <div className="flex flex-col gap-2">
          <p>{product.title}</p>
          <Button 
            variant="destructive" 
            onClick={() => removeItem(product.id, size)}
          >
            Отменить
          </Button>
        </div>
      ),
      duration: 5000,
    });
  };

  return (
    <>
      <Card className="overflow-hidden group">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-light text-tea-text">{product.title}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-tea-brown text-lg">{product.price} €</span>
          <Button
            onClick={() => sizes ? setOpen(true) : handleAddToCart()}
            className="bg-tea-brown hover:bg-tea-brown/90"
          >
            В корзину
          </Button>
        </CardFooter>
      </Card>

      {sizes && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Выберите размер упаковки</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {sizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => handleAddToCart(size)}
                  variant="outline"
                  className="text-lg"
                >
                  {size} г
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
