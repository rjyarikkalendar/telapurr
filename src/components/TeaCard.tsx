
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
  const [imageError, setImageError] = useState(false);
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

  // Получаем изображения из JSON массива, теперь приоритет данным из БД
  const getTeaImageUrl = () => {
    // Дефолтные изображения как запасной вариант
    const defaultImages = {
      'shen': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_6128_n2uthq.jpg',
      'shu': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_8194_ywgiux.jpg',
      'green': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_6128_n2uthq.jpg',
      'black': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_8194_ywgiux.jpg',
      'white': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_6128_n2uthq.jpg',
      'oolong': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_8194_ywgiux.jpg',
      'red': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_8194_ywgiux.jpg',
      'gabba': 'https://res.cloudinary.com/drukljqft/image/upload/v1748278963/IMG_8194_ywgiux.jpg'
    };

    // Если есть ошибка загрузки, используем дефолтное
    if (imageError) {
      return defaultImages[tea.type as keyof typeof defaultImages] || defaultImages.shen;
    }

    // Проверяем, есть ли изображения в БД
    if (tea.image_url && Array.isArray(tea.image_url) && tea.image_url.length > 0) {
      const firstImage = tea.image_url[0];
      if (firstImage) {
        console.log('Using image from database for tea:', tea.id, 'URL:', firstImage);
        return firstImage;
      }
    }

    // Если в БД нет изображений, используем дефолтное
    console.log('No image in database for tea:', tea.id, 'using default for type:', tea.type);
    return defaultImages[tea.type as keyof typeof defaultImages] || defaultImages.shen;
  };

  const handleAddToCart = (weightType?: string, price?: number) => {
    // Создаем объект продукта, совместимый с существующей системой корзины
    const product = {
      id: tea.id,
      title: localizedData.name,
      description: localizedData.description,
      price: price || tea.price,
      image: getTeaImageUrl(),
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

  const handleImageError = () => {
    console.log('Image loading error for tea:', tea.id, 'URL:', getTeaImageUrl());
    setImageError(true);
  };

  return (
    <>
      <Card className="overflow-hidden group h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={getTeaImageUrl()}
            alt={localizedData.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          {tea.age && (
            <Badge className="absolute top-2 right-2 bg-tea-brown text-white text-xs">
              {tea.age} лет
            </Badge>
          )}
        </div>
        <CardContent className="p-3 flex-1">
          <div className="space-y-1">
            <div>
              <h3 className="text-sm font-medium text-tea-text line-clamp-2">{localizedData.name}</h3>
              {localizedData.subname && (
                <p className="text-xs text-tea-brown font-medium">{localizedData.subname}</p>
              )}
            </div>
            <p className="text-gray-600 text-xs line-clamp-2">{localizedData.description}</p>
            {tea.yearbirth && (
              <p className="text-xs text-gray-500">Урожай: {tea.yearbirth}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          <span className="text-tea-brown text-sm font-semibold">
            от {tea.price} €
          </span>
          <Button
            onClick={() => tea.prices && tea.prices.length > 0 ? setOpen(true) : handleAddToCart()}
            className="bg-tea-brown hover:bg-tea-brown/90 text-xs px-2 py-1 h-auto"
            disabled={!tea.in_stock}
          >
            {tea.in_stock ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </CardFooter>
      </Card>

      {tea.prices && tea.prices.length > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
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
        </Dialog>
      )}
    </>
  );
};
