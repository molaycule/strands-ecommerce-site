import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useCartStore } from 'store/useCartStore';
import { FC } from 'react';
import Link from 'next/link';
import routes from 'routes';

const CartTable = dynamic(() => import('./CartTable'), {
  ssr: false
});

const CartCheckout = dynamic(() => import('./CartCheckout'), {
  ssr: false
});

export interface CartContainerProps {
  checkout: boolean;
}

const CartContainer: FC<CartContainerProps> = ({ checkout }) => {
  const cart = useCartStore(state => state.cart);

  return (
    <>
      <div className='container'>
        <div className='bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg'>
          <Link href={routes.home}>
            <a className='stext-109 cl8 hov-cl1 trans-04'>
              Home
              <FontAwesomeIcon
                icon='angle-right'
                className='m-l-9 m-r-10'
                width={4.5}
                height={12}
              />
            </a>
          </Link>
          <span className='stext-109 cl4'>Shopping Cart</span>
        </div>
      </div>
      <div className='bg0 p-t-75 p-b-85'>
        <div className='container'>
          <div className='row'>
            <CartTable cart={cart} checkout={checkout} />
            {checkout && cart.length > 0 && <CartCheckout cart={cart} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContainer;
