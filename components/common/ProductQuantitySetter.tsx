import { Dispatch, FC, SetStateAction } from 'react';
import { useCartStore } from 'store/useCartStore';
import { useProductStore } from 'store/useProductStore';
import { Utils } from 'utils';

interface ProductQuantitySetterProps {
  numberOfProduct: number;
  setNumberOfProduct: Dispatch<SetStateAction<number>>;
  isProductInCart: boolean;
}

const ProductQuantitySetter: FC<ProductQuantitySetterProps> = ({
  numberOfProduct,
  setNumberOfProduct,
  isProductInCart
}) => {
  const product = useProductStore(state => state.product);
  const addToCartHandler = useCartStore(state => state.addToCartHandler);

  const decrementNumberOfProductHandler = () => {
    if (numberOfProduct === 1) return;

    if (isProductInCart) {
      addToCartHandler(product, numberOfProduct - 1);
    }
    Utils.decrementNumberOfProduct(setNumberOfProduct);
  };

  const incrementNumberOfProductHandler = () => {
    if (isProductInCart) {
      addToCartHandler(product, numberOfProduct + 1);
    }
    Utils.incrementNumberOfProduct(setNumberOfProduct);
  };

  return (
    <>
      <div
        className='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'
        onClick={decrementNumberOfProductHandler}>
        <i className='fs-16 zmdi zmdi-minus'></i>
      </div>
      <input
        className='mtext-104 cl3 txt-center num-product'
        type='number'
        name='num-product'
        disabled
        value={numberOfProduct}
      />
      <div
        className='btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'
        onClick={incrementNumberOfProductHandler}>
        <i className='fs-16 zmdi zmdi-plus'></i>
      </div>
    </>
  );
};

export default ProductQuantitySetter;
