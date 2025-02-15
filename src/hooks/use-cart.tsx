
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types/products';
import { v4 as uuidv4 } from 'uuid';

interface CartStore {
  sessionId: string;
  items: CartItem[];
  lastUpdated: number;
  addItem: (item: Product, size?: number) => void;
  removeItem: (itemId: string, size?: number) => void;
  updateQuantity: (itemId: string, quantity: number, size?: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const SESSION_TIMEOUT = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

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
        
        if (currentTime - lastUpdated > SESSION_TIMEOUT) {
          set({ items: [], sessionId: uuidv4() });
        }
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.selectedSize === size
          );

          let newItems;
          if (existingItemIndex > -1) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += 1;
          } else {
            newItems = [...state.items, { ...item, quantity: 1, selectedSize: size }];
          }

          return {
            items: newItems,
            lastUpdated: currentTime,
            itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        });
      },
      removeItem: (itemId, size) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.id === itemId && item.selectedSize === size)
          );
          return {
            items: newItems,
            lastUpdated: Date.now(),
            itemCount: newItems.reduce((acc, item) => acc + item.quantity, 0)
          };
        });
      },
      updateQuantity: (itemId, quantity, size) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === itemId && item.selectedSize === size) {
              return { ...item, quantity };
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
