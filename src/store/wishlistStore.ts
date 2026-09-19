import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  categoryName?: string;
  href?: string;
};

type WishlistState = {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clear: () => void;
};

export const WISHLIST_STORAGE_KEY = 'giftz_wishlist_v1';

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        if (get().hasItem(item.id)) {
          get().removeItem(item.id);
        } else {
          get().addItem(item);
        }
      },
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      hasItem: (id) => get().items.some((i) => i.id === id),
      clear: () => set({ items: [] }),
    }),
    { name: WISHLIST_STORAGE_KEY },
  ),
);
