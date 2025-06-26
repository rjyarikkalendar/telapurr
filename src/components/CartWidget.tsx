
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";

export const CartWidget = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        onClick={() => itemCount > 0 && navigate('/cart')}
        className={`rounded-full p-4 ${
          itemCount > 0 
            ? 'bg-tea-brown hover:bg-tea-brown/90' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={itemCount === 0}
      >
        <ShoppingBag className="w-6 h-6 text-white" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {itemCount}
          </span>
        )}
      </Button>
    </div>
  );
};
