
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types/products';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

interface CartStore {
  sessionId: string;
  items: CartItem[];
  lastUpdated: number;
  addItem: (item: Product, size?: number) => void;
  removeItem: (itemId: string, size?: number, weight?: string) => void;
  updateQuantity: (itemId: string, quantity: number, size?: number, weight?: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const GUEST_SESSION_TIMEOUT = 3 * 60 * 60 * 1000; // 3 hours
const AUTH_SESSION_TIMEOUT = 60 * 24 * 60 * 60 * 1000; // 2 months

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      sessionId: uuidv4(),
      items: [],
      lastUpdated: Date.now(),
      itemCount: 0,
      addItem: (item, size) => {
        const currentTime = Date.now();
        const lastUpdated = get().lastUpdated;
        
        const user = supabase.auth.getUser();
        const sessionTimeout = user ? AUTH_SESSION_TIMEOUT : GUEST_SESSION_TIMEOUT;
        
        if (currentTime - lastUpdated > sessionTimeout) {
          set({ items: [], sessionId: uuidv4() });
        }
        
        set((state) => {
          // For tea items, use selectedWeight as the key, for others use selectedSize
          const keyField = item.category === 'tea' ? 'selectedWeight' : 'selectedSize';
          const keyValue = item.category === 'tea' ? item.selectedWeight : size;
          
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i[keyField as keyof CartItem] === keyValue
          );

          let newItems;
          if (existingItemIndex > -1) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
          } else {
            const cartItem = { 
              ...item, 
              quantity: 1, 
              selectedSize: item.category !== 'tea' ? size : undefined,
              selectedWeight: item.category === 'tea' ? item.selectedWeight : undefined
            };
            newItems = [...state.items, cartItem];
          }

          return {
            items: newItems,
            lastUpdated: currentTime,
            itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        });
      },
      removeItem: (itemId, size, weight) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => {
              if (item.category === 'tea') {
                return !(item.id === itemId && item.selectedWeight === weight);
              } else {
                return !(item.id === itemId && item.selectedSize === size);
              }
            }
          );
          return {
            items: newItems,
            lastUpdated: Date.now(),
            itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        });
      },
      updateQuantity: (itemId, quantity, size, weight) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.category === 'tea') {
              if (item.id === itemId && item.selectedWeight === weight) {
                return { ...item, quantity };
              }
            } else {
              if (item.id === itemId && item.selectedSize === size) {
                return { ...item, quantity };
              }
            }
            return item;
          });
          return {
            items: newItems,
            lastUpdated: Date.now(),
            itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        });
      },
      clearCart: () => {
        set({ items: [], lastUpdated: Date.now(), itemCount: 0 });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
