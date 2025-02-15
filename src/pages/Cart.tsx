
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (itemId: string, quantity: number, size?: number) => {
    if (quantity < 1) {
      removeItem(itemId, size);
    } else {
      updateQuantity(itemId, quantity, size);
    }
  };

  return (
    <div className="min-h-screen bg-tea-bg py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8">Корзина</h1>
        
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
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    {item.category === 'tea' && item.selectedSize && (
                      <p className="text-gray-500">{item.selectedSize} г</p>
                    )}
                    <p className="text-tea-brown">{item.price} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.selectedSize)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id, item.selectedSize)}
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
