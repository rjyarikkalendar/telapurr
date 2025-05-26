
import { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TeaWithPrices } from "@/services/teaService";
import { useLanguage } from "@/hooks/use-language";

interface TeaCardProps {
  tea: TeaWithPrices;
}

export const TeaCard = ({ tea }: TeaCardProps) => {
  const [open, setOpen] = useState(false);
  const { addItem, removeItem } = useCart();
  const { currentLang } = useLanguage();

  // Получаем данные на текущем языке из multilingual поля
  const getLocalizedData = () => {
    if (tea.multilingual && typeof tea.multilingual === 'object') {
      const langData = (tea.multilingual as any)[currentLang];
      if (langData) {
        return {
          name: langData.name || tea.title,
          subname: langData.subname || '',
          subtitle: langData.subtitle || '',
          description: langData.description || tea.description,
          effect: langData.effect || '',
          flavour: langData.flavour || '',
          aroma: langData.aroma || ''
        };
      }
    }
    return {
      name: tea.title,
      subname: '',
      subtitle: '',
      description: tea.description || '',
      effect: '',
      flavour: '',
      aroma: ''
    };
  };

  const localizedData = getLocalizedData();

  const handleAddToCart = (weightType?: string, price?: number) => {
    // Создаем объект продукта, совместимый с существующей системой корзины
    const product = {
      id: tea.id,
      title: localizedData.name,
      description: localizedData.description,
      price: price || tea.price,
      image: tea.image_url || '/placeholder.svg',
      category: 'tea' as const,
      catalogId: 'tea',
      selectedWeight: weightType
    };
    
    addItem(product);
    setOpen(false);
    toast({
      title: "Товар добавлен в корзину",
      description: (
        <div className="flex flex-col gap-2">
          <p>{localizedData.name} {weightType ? `(${weightType})` : ''}</p>
          <Button 
            variant="destructive" 
            onClick={() => removeItem(tea.id)}
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
            src={tea.image_url || '/placeholder.svg'}
            alt={localizedData.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {tea.age && (
            <Badge className="absolute top-2 right-2 bg-tea-brown text-white">
              {tea.age} лет
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-light text-tea-text">{localizedData.name}</h3>
              {localizedData.subname && (
                <p className="text-sm text-tea-brown font-medium">{localizedData.subname}</p>
              )}
              {localizedData.subtitle && (
                <p className="text-xs text-gray-500">{localizedData.subtitle}</p>
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{localizedData.description}</p>
            {tea.yearbirth && (
              <p className="text-xs text-gray-500">Год урожая: {tea.yearbirth}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-tea-brown text-lg font-semibold">
            от {tea.price} €
          </span>
          <Button
            onClick={() => tea.prices && tea.prices.length > 0 ? setOpen(true) : handleAddToCart()}
            className="bg-tea-brown hover:bg-tea-brown/90"
            disabled={!tea.in_stock}
          >
            {tea.in_stock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </CardFooter>
      </Card>

      {tea.prices && tea.prices.length > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Выберите размер упаковки</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {tea.prices.map((priceOption) => (
                <Button
                  key={priceOption.id}
                  onClick={() => handleAddToCart(priceOption.weight_type, priceOption.price)}
                  variant="outline"
                  className="flex flex-col h-auto p-4"
                >
                  <span className="text-lg font-medium">
                    {priceOption.weight_type.replace('_', ' ')}
                  </span>
                  <span className="text-tea-brown font-semibold">
                    {priceOption.price} €
                  </span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
