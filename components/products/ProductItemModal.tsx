import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';
import Slider from 'react-slick';
import { Utils } from 'utils';

const ProductItemModal = () => {
  const sliderRef = useRef<Slider>(null);
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false
  };
  const sizeOptions = [
    { value: 's', label: 'Size S' },
    { value: 'm', label: 'Size M' },
    { value: 'l', label: 'Size L' },
    { value: 'xl', label: 'Size XL' }
  ];
  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'white', label: 'White' },
    { value: 'grey', label: 'Grey' }
  ];

  const hideProductItemModalHandler = () => {
    document.querySelector('.js-modal1').classList.remove('show-modal1');
  };

  const addToCartHandler = () => {
    const productName = document.querySelector('.js-name-detail').textContent;
    swal(productName, 'is added to cart !', 'success');
  };

  return (
    <div className='wrap-modal1 js-modal1 p-t-60 p-b-20'>
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
                  <Slider
                    {...sliderSettings}
                    ref={ref => (sliderRef.current = ref)}
                    className='slick3'>
                    <div className='item-slick3'>
                      <div className='wrap-pic-w pos-relative'>
                        <img
                          src='images/product-detail-01.jpg'
                          alt='IMG-PRODUCT'
                        />
                      </div>
                    </div>
                    <div className='item-slick3'>
                      <div className='wrap-pic-w pos-relative'>
                        <img
                          src='images/product-detail-02.jpg'
                          alt='IMG-PRODUCT'
                        />
                      </div>
                    </div>
                    <div className='item-slick3'>
                      <div className='wrap-pic-w pos-relative'>
                        <img
                          src='images/product-detail-03.jpg'
                          alt='IMG-PRODUCT'
                        />
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-lg-5 p-b-30'>
              <div className='p-r-50 p-t-5 p-lr-0-lg'>
                <h4 className='mtext-105 cl2 js-name-detail p-b-14'>
                  Lightweight Jacket
                </h4>
                <span className='mtext-106 cl2'>₦58.79</span>
                <p className='stext-102 cl3 p-t-23'>
                  Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
                  ligula. Mauris consequat ornare feugiat.
                </p>

                <div className='p-t-33'>
                  <div className='flex-w flex-r-m p-b-10'>
                    <div className='size-203 flex-c-m respon6'>Size</div>
                    <div className='size-204 respon6-next'>
                      <Select
                        instanceId='size'
                        options={sizeOptions}
                        placeholder='Choose an option'
                      />
                    </div>
                  </div>
                  <div className='flex-w flex-r-m p-b-10'>
                    <div className='size-203 flex-c-m respon6'>Color</div>
                    <div className='size-204 respon6-next'>
                      <Select
                        instanceId='color'
                        options={colorOptions}
                        placeholder='Choose an option'
                      />
                    </div>
                  </div>
                  <div className='flex-w flex-r-m p-b-10'>
                    <div className='size-204 flex-w flex-m respon6-next'>
                      <div className='wrap-num-product flex-w m-r-20 m-tb-10'>
                        <div
                          className='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'
                          onClick={() =>
                            Utils.decrementNumberOfProduct(setNumberOfProduct)
                          }>
                          <i className='fs-16 zmdi zmdi-minus'></i>
                        </div>
                        <input
                          className='mtext-104 cl3 txt-center num-product'
                          type='number'
                          name='num-product'
                          value={numberOfProduct}
                          onChange={e =>
                            setNumberOfProduct(Number(e.target.value))
                          }
                        />
                        <div
                          className='btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'
                          onClick={() =>
                            Utils.incrementNumberOfProduct(setNumberOfProduct)
                          }>
                          <i className='fs-16 zmdi zmdi-plus'></i>
                        </div>
                      </div>
                      <button
                        className='flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail'
                        onClick={addToCartHandler}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className='flex-w flex-m p-l-100 p-t-40 respon7'>
                  <div className='flex-m bor9 p-r-10 m-r-11'>
                    <a
                      href='#'
                      className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100'
                      data-tooltip='Add to Wishlist'>
                      <i className='zmdi zmdi-favorite'></i>
                    </a>
                  </div>
                  <a
                    href='#'
                    className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100'
                    data-tooltip='Facebook'>
                    <FontAwesomeIcon
                      icon={['fab', 'facebook']}
                      width={18}
                      height={18}
                    />
                  </a>
                  <a
                    href='#'
                    className='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100'
                    data-tooltip='Twitter'>
                    <FontAwesomeIcon
                      icon={['fab', 'twitter']}
                      width={18}
                      height={18}
                    />
                  </a>
                  <a
                    href='#'
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
    </div>
  );
};

export default ProductItemModal;
