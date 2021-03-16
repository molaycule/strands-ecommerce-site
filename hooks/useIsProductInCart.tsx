import { useMemo } from 'react';
import { Utils } from 'utils';
import { Product, CartItem } from 'types';

const useIsProductInCart = (product: Product, cart: CartItem[]) => {
  const isProductInCart = useMemo(() => {
    if (Utils.isServer || !cart || !product) return false;

    return cart.some(item => item.product.id === product.id);
  }, [cart, product]);

  return isProductInCart;
};

export default useIsProductInCart;
