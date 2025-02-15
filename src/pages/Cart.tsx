
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-tea-bg py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8">Корзина</h1>
        {/* Здесь будет содержимое корзины */}
        <div className="flex justify-end mt-8">
          <Button 
            onClick={() => navigate('/checkout')}
            className="bg-tea-brown hover:bg-tea-brown/90"
          >
            Перейти к оформлению
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
