
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (itemId: string, quantity: number, size?: number, weight?: string) => {
    if (quantity < 1) {
      removeItem(itemId, size, weight);
    } else {
      updateQuantity(itemId, quantity, size, weight);
    }
  };

  // Helper function to display weight for tea items
  const getWeightDisplay = (item: any) => {
    if (item.category === 'tea' && item.selectedWeight) {
      // Convert weight_type to readable format
      const weightMap: { [key: string]: string } = {
        '50_gramm': '50 г',
        '100_gramm': '100 г',
        '200_gramm': '200 г',
        '357_gramm': '357 г'
      };
      return weightMap[item.selectedWeight] || item.selectedWeight;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#D3E4E0]/50 backdrop-blur-sm py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8 text-center">Корзина</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-tea-brown hover:bg-tea-brown/90"
            >
              Вернуться к покупкам
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize || item.selectedWeight}-${index}`} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    {getWeightDisplay(item) && (
                      <p className="text-gray-500 text-sm">{getWeightDisplay(item)}</p>
                    )}
                    <p className="text-tea-brown font-semibold">{item.price} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize, item.selectedWeight)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedSize, item.selectedWeight)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id, item.selectedSize, item.selectedWeight)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <Button 
                onClick={() => navigate('/checkout')}
                className="bg-tea-brown hover:bg-tea-brown/90"
              >
                Перейти к оформлению
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
