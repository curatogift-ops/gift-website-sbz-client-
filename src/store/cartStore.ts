import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categoryName?: string;
  href?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totalCount: () => number;
  subtotal: () => number;
};

export const CART_STORAGE_KEY = 'giftz_cart_v1';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const qty = Math.max(1, item.quantity ?? 1);
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: qty }],
          };
        });
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQuantity: (id, quantity) => {
        const safe = Math.floor(quantity);
        if (safe <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity: safe } : i)),
        }));
      },
      clear: () => set({ items: [] }),
      totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: CART_STORAGE_KEY },
  ),
);
