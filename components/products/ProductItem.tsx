import { FC, MouseEvent } from 'react';
import { useProductStore } from 'store/useProductStore';
import { useWishlistStore } from 'store/useWishlistStore';
import state from 'sweetalert/typings/modules/state';
import { Product } from 'types';

export interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const wishlist = useWishlistStore(state => state.wishlist);
  const addToWishlistHandler = useWishlistStore(
    state => state.addToWishlistHandler
  );
  const removeFromWishlistHandler = useWishlistStore(
    state => state.removeFromWishlistHandler
  );
  const selectedProductHandler = useProductStore(
    state => state.selectedProductHandler
  );
  const showProductItemModalHandler = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    selectedProductHandler(product);
    document.querySelector('.js-modal1').classList.add('show-modal1');
  };
  const wishlistHandler = () => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlistHandler(product.id);
    } else {
      addToWishlistHandler(product);
    }
  };

  return (
    <div className={`col-sm-6 col-md-4 col-lg-3 p-b-35`}>
      <div className='block2'>
        <div className='block2-pic hov-img0'>
          <img src={product.mainImage.publicUrl} alt='IMG-PRODUCT' />
          <a
            onClick={e => showProductItemModalHandler(e)}
            className='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1 cur-pointer'>
            Quick View
          </a>
        </div>
        <div className='block2-txt flex-w flex-t p-t-14'>
          <div className='block2-txt-child1 flex-col-l '>
            <a
              href='product-detail.html'
              className='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6'>
              {product.name}
            </a>
            <span className='stext-105 cl3'>₦{product.price.toFixed(2)}</span>
          </div>
          <div className='block2-txt-child2 flex-r p-t-3'>
            <a
              onClick={wishlistHandler}
              className='btn-addwish-b2 dis-block pos-relative js-addwish-b2 cur-pointer'>
              <img
                className='icon-heart1 dis-block trans-04'
                src='images/icons/icon-heart-01.png'
                alt='ICON'
                width={20}
                height={20}
              />
              <img
                className='icon-heart2 dis-block trans-04 ab-t-l'
                src='images/icons/icon-heart-02.png'
                data-active-wishlist={
                  wishlist.some(item => item.id === product.id) ? 1 : 0
                }
                alt='ICON'
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
