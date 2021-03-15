import { useMemo } from 'react';
import { Utils } from 'utils';
import { useProductStore } from 'store/useProductStore';
import { useCartStore } from 'store/useCartStore';

const useIsProductInCart = () => {
  const product = useProductStore(state => state.product);
  const cart = useCartStore(state => state.cart);

  const isProductInCart = useMemo(() => {
    if (Utils.isServer || !cart || !product) return false;

    return cart.some(item => item.product.id === product.id);
  }, [cart, product]);

  return isProductInCart;
};

export default useIsProductInCart;
