
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/products';
import { v4 as uuidv4 } from 'uuid';

interface CartStore {
  sessionId: string;
  items: Product[];
  lastUpdated: number;
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
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
      addItem: (item) => {
        const currentTime = Date.now();
        const lastUpdated = get().lastUpdated;
        
        // Check session timeout
        if (currentTime - lastUpdated > SESSION_TIMEOUT) {
          set({ items: [], sessionId: uuidv4() });
        }
        
        set((state) => ({
          items: [...state.items, item],
          lastUpdated: currentTime,
          itemCount: state.items.length + 1
        }));
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          lastUpdated: Date.now(),
          itemCount: state.items.length - 1
        }));
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
