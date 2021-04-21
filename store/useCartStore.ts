import { CartItem, Product } from 'types';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type CartState = {
  cart: CartItem[];
  getCartTotalPrice: () => number;
  addToCartHandler: (
    product: Product,
    quantity: number,
    callback?: () => void
  ) => void;
  removeFromCartHandler: (productId: string, callback?: () => void) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>(
  persist(
    (set, get) => ({
      cart: [],
      getCartTotalPrice: () =>
        get()
          .cart.map(item => ({
            price: Number(item.product.price),
            quantity: Number(item.quantity)
          }))
          .reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
      addToCartHandler: (product, quantity, callback) => {
        if (
          get().cart.some(
            item => item.product.id === product.id && item.quantity === quantity
          )
        )
          return;

        if (callback) callback(); // invoke callback function

        const index = get().cart.findIndex(
          item => item.product.id === product.id
        );

        if (index !== -1) {
          let newCart = [...get().cart];
          newCart[index] = { ...newCart[index], quantity };
          set({ cart: newCart });
          return;
        }

        set({
          cart: [...get().cart, { product, quantity }]
        });
      },
      removeFromCartHandler: (productId, callback) => {
        if (callback) callback(); // invoke callback function
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      clearCart: () => {
        set({ cart: get().cart.filter(() => false) });
      }
    }),
    {
      name: 'cart',
      getStorage: () => localStorage
    }
  )
);
