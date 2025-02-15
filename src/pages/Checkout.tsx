
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const handlePayment = async () => {
    // Здесь будет интеграция с платежной системой
    console.log("Payment initiated");
  };

  return (
    <div className="min-h-screen bg-tea-bg py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-playfair text-tea-text mb-8">Оформление заказа</h1>
        <div className="max-w-2xl mx-auto">
          {/* Здесь будет форма оформления заказа */}
          <Button 
            onClick={handlePayment}
            className="w-full bg-tea-brown hover:bg-tea-brown/90 mt-8"
          >
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
