import { useMemo } from 'react';
import { Utils } from 'utils';
import { useProductStore } from 'store/useProductStore';
import { useWishlistStore } from 'store/useWishlistStore';

const useIsProductInWishlist = () => {
  const product = useProductStore(state => state.product);
  const wishlist = useWishlistStore(state => state.wishlist);

  const isProductInWishlist = useMemo(() => {
    if (Utils.isServer || !wishlist || !product) return false;

    return wishlist.some(item => item.id === product.id);
  }, [wishlist, product]);

  return isProductInWishlist;
};

export default useIsProductInWishlist;
