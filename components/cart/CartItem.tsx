import dynamic from 'next/dynamic';
import useIsProductInCart from 'hooks/useIsProductInCart';
import { FC, useState, useEffect } from 'react';
import { useCartStore } from 'store/useCartStore';
import { Product } from 'types';

const ProductQuantitySetter = dynamic(
  () => import('components/common/ProductQuantitySetter'),
  {
    ssr: false
  }
);

export interface CartItemProps {
  product: Product;
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  const cart = useCartStore(state => state.cart);
  const removeFromCartHandler = useCartStore(
    state => state.removeFromCartHandler
  );
  const isProductInCart = useIsProductInCart(product, cart);
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  useEffect(() => {
    if (isProductInCart) {
      const cartProduct = cart.find(item => item.product.id === product.id);
      setNumberOfProduct(cartProduct.quantity);
    } else {
      setNumberOfProduct(1);
    }
  }, [isProductInCart, product]);

  return (
    <tr className='table_row'>
      <td className='column-1'>
        <div
          className='how-itemcart1'
          onClick={() => removeFromCartHandler(product.id)}>
          <img src={product.mainImage.publicUrl} alt='IMG' />
        </div>
      </td>
      <td className='column-2'>
        {product.name}
        <a
          className='header-wishlist-item-info hov-cl1 pointer'
          onClick={() => removeFromCartHandler(product.id)}>
          Remove
        </a>
      </td>
      <td className='column-3'>₦{product.price.toFixed(2)}</td>
      <td className='column-4'>
        <div className='wrap-num-product flex-w m-l-auto m-r-0'>
          <ProductQuantitySetter
            product={product}
            numberOfProduct={numberOfProduct}
            setNumberOfProduct={setNumberOfProduct}
            isProductInCart={isProductInCart}
          />
        </div>
      </td>
      <td className='column-5'>
        ₦{(numberOfProduct * Number(product.price)).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
