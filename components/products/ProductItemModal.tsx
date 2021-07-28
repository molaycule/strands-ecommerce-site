import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
// import Select from 'react-select';
import swal from 'sweetalert';
import Slider from 'react-slick';
import { useProductStore } from 'store/useProductStore';
import { useCartStore } from 'store/useCartStore';
import { useWishlistStore } from 'store/useWishlistStore';
import dynamic from 'next/dynamic';
import useIsProductInCart from 'hooks/useIsProductInCart';
import useIsProductInWishlist from 'hooks/useIsProductInWishlist';

const ProductQuantitySetter = dynamic(
  () => import('components/common/ProductQuantitySetter'),
  {
    ssr: false
  }
);

const sliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false
};

const ProductItemModal = () => {
  const product = useProductStore(state => state.product);
  const addToWishlistHandler = useWishlistStore(
    state => state.addToWishlistHandler
  );
  const removeFromWishlistHandler = useWishlistStore(
    state => state.removeFromWishlistHandler
  );
  const cart = useCartStore(state => state.cart);
  const addToCartHandler = useCartStore(state => state.addToCartHandler);
  const removeFromCartHandler = useCartStore(
    state => state.removeFromCartHandler
  );
  const sliderRef = useRef<Slider>(null);
  const isProductInCart = useIsProductInCart(product, cart);
  const isProductInWishlist = useIsProductInWishlist();
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  const hideProductItemModalHandler = () => {
    document.querySelector('.js-modal1').classList.remove('show-modal1');
  };

  const cartBtnCallback = () => {
    swal(
      product.name,
      isProductInCart ? 'is removed from cart' : 'is added to cart !',
      'success'
    );
  };

  const cartBtnHandler = () => {
    if (isProductInCart) {
      removeFromCartHandler(product.id, cartBtnCallback);
    } else {
      addToCartHandler(product, numberOfProduct, cartBtnCallback);
    }
  };

  const productWishlistHandler = () => {
    if (isProductInWishlist) {
      removeFromWishlistHandler(product.id);
      swal(product.name, 'is removed from wishlist !', 'success');
    } else {
      addToWishlistHandler(product);
      swal(product.name, 'is added to wishlist !', 'success');
    }
  };

  useEffect(() => {
    const wishlistElement = document.querySelector('.js-addwish-detail');
    if (wishlistElement) {
      if (isProductInWishlist) {
        wishlistElement.classList.add('cl1');
        wishlistElement.classList.remove('cl3');
      } else {
        wishlistElement.classList.add('cl3');
        wishlistElement.classList.remove('cl1');
      }
    }
  }, [isProductInWishlist]);

  useEffect(() => {
    if (isProductInCart) {
      const cartProduct = cart.find(item => item.product.id === product.id);
      setNumberOfProduct(cartProduct.quantity);
    } else {
      setNumberOfProduct(1);
    }
  }, [isProductInCart, product]);

  return (
    <div className='wrap-modal1 js-modal1 p-t-60 p-b-20'>
      {product && (
        <>
          <div className='overlay-modal1 js-hide-modal1'></div>
          <div className='container'>
            <div className='bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent'>
              <button
                className='how-pos3 hov3 trans-04 js-hide-modal1'
                onClick={hideProductItemModalHandler}>
                <img src='images/icons/icon-close.png' alt='CLOSE' />
              </button>
              <div className='row'>
                <div className='col-md-6 col-lg-7 p-b-30'>
                  <div className='p-l-25 p-r-30 p-lr-0-lg'>
                    <div className='wrap-slick3 flex-sb flex-w'>
                      {product.otherImage?.publicUrl && (
                        <div className='wrap-slick3-arrows flex-sb-m flex-w'>
                          <button
                            className='arrow-slick3 prev-slick3'
                            onClick={() => sliderRef.current.slickPrev()}>
                            <FontAwesomeIcon icon='angle-left' />
                          </button>
                          <button
                            className='arrow-slick3 next-slick3'
                            onClick={() => sliderRef.current.slickNext()}>
                            <FontAwesomeIcon icon='angle-right' />
                          </button>
                        </div>
                      )}
                      <Slider
                        {...sliderSettings}
                        ref={ref => (sliderRef.current = ref)}
                        className='slick3'>
                        <div className='item-slick3'>
                          <div className='wrap-pic-w pos-relative'>
                            <img
                              src={product.mainImage.publicUrl}
                              alt='IMG-PRODUCT'
                            />
                          </div>
                        </div>
                        {product.otherImage?.publicUrl && (
                          <div className='item-slick3'>
                            <div className='wrap-pic-w pos-relative'>
                              <img
                                src={product.otherImage.publicUrl}
                                alt='IMG-PRODUCT'
                              />
                            </div>
                          </div>
                        )}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-lg-5 p-b-30'>
                  <div className='p-r-50 p-t-5 p-lr-0-lg'>
                    <h4 className='mtext-105 cl2 js-name-detail p-b-14'>
                      {product.name}
                    </h4>
                    <span className='mtext-106 cl2'>
                      ₦{product.price.toFixed(2)}
                    </span>
                    <div className='mtext-104 cl2'>
                      {product.quantityInStock ? 'In stock' : 'Out of stock'}
                    </div>
                    <p className='stext-102 cl3 p-t-23'>
                      {product.description}
                    </p>
                    <div className='p-t-33'>
                      <div className='flex-w flex-r-s p-b-10'>
                        <div className='size-204 flex-w flex-m respon6-next'>
                          <div className='wrap-num-product flex-w m-r-20 m-tb-10'>
                            <ProductQuantitySetter
                              product={product}
                              numberOfProduct={numberOfProduct}
                              setNumberOfProduct={setNumberOfProduct}
                              isProductInCart={isProductInCart}
                            />
                          </div>
                          <button
                            className='flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail btn-cart'
                            onClick={cartBtnHandler}
                            disabled={product.quantityInStock === 0}>
                            {isProductInCart
                              ? 'Remove from cart'
                              : 'Add to cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='flex-w flex-r-s p-t-40'>
                      <div className='flex-m bor9 p-r-10 m-r-11'>
                        <a
                          className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100'
                          data-tooltip={
                            isProductInWishlist
                              ? 'Remove from Wishlist'
                              : 'Add to Wishlist'
                          }
                          onClick={productWishlistHandler}>
                          <i className='zmdi zmdi-favorite'></i>
                        </a>
                      </div>
                      <a
                        href={
                          product.facebookLink ||
                          'https://www.facebook.com/Strands_ng-103328295135202'
                        }
                        target='_blank'
                        className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100'
                        data-tooltip='Facebook'>
                        <FontAwesomeIcon
                          icon={['fab', 'facebook']}
                          width={18}
                          height={18}
                        />
                      </a>
                      <a
                        href={product.twitterLink || '#'}
                        target='_blank'
                        className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100'
                        data-tooltip='Twitter'>
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          width={18}
                          height={18}
                        />
                      </a>
                      <a
                        href={
                          product.instagramLink ||
                          'https://www.instagram.com/strands_ng/'
                        }
                        target='_blank'
                        className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100'
                        data-tooltip='Instagram'>
                        <FontAwesomeIcon
                          icon={['fab', 'instagram-square']}
                          width={18}
                          height={18}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductItemModal;
