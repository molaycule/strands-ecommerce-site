import { FC } from 'react';
import { useCartStore } from 'store/useCartStore';
import { CartItemProps } from './CartItem';

export interface CartPanelItemProps {
  productId: string;
  imageUrl: string;
  itemName: string;
  quantity: number;
  price: number;
}

const CartPanelItem: FC<CartPanelItemProps> = ({
  productId,
  imageUrl,
  itemName,
  quantity,
  price
}) => {
  const removeFromCartHandler = useCartStore(
    state => state.removeFromCartHandler
  );

  return (
    <li className='header-cart-item flex-w flex-t m-b-12'>
      <div
        className='header-cart-item-img'
        onClick={() => removeFromCartHandler(productId)}>
        <img src={imageUrl} alt='IMG' />
      </div>
      <div className='header-cart-item-txt p-t-8'>
        <a href='#' className='header-cart-item-name m-b-4 hov-cl1 trans-04'>
          {itemName}
        </a>
        <span className='header-cart-item-info'>
          {quantity} x ₦{price}
        </span>
        <a
          className='header-wishlist-item-info hov-cl1 pointer'
          onClick={() => removeFromCartHandler(productId)}>
          Remove
        </a>
      </div>
    </li>
  );
};

export default CartPanelItem;
