import { Product } from 'types';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  wishlist: Product[];
  addToWishlistHandler: (product: Product) => void;
  removeFromWishlistHandler: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlistHandler: product => {
        if (get().wishlist.some(item => item.id === product.id)) return;
        set({ wishlist: [...get().wishlist, product] });
      },
      removeFromWishlistHandler: productId => {
        set({ wishlist: get().wishlist.filter(item => item.id !== productId) });
      }
    }),
    {
      name: 'wishlist',
      getStorage: () => localStorage
    }
  )
);
