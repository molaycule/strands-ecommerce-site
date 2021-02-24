import { FC } from 'react';
import { CartItemProps } from './CartItem';

export interface CartPanelItemProps extends CartItemProps {
  quantity: number;
}

const CartPanelItem: FC<CartPanelItemProps> = ({
  imageUrl,
  itemName,
  quantity,
  price
}) => {
  return (
    <li className='header-cart-item flex-w flex-t m-b-12'>
      <div className='header-cart-item-img'>
        <img src={imageUrl} alt='IMG' />
      </div>
      <div className='header-cart-item-txt p-t-8'>
        <a href='#' className='header-cart-item-name m-b-18 hov-cl1 trans-04'>
          {itemName}
        </a>
        <span className='header-cart-item-info'>
          {quantity} x ₦{price}
        </span>
      </div>
    </li>
  );
};

export default CartPanelItem;
