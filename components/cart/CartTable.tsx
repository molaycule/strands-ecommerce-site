import dynamic from 'next/dynamic';
import { CartItem as CartItemType } from 'types';
import { FC } from 'react';

const CartItem = dynamic(() => import('components/cart/CartItem'), {
  ssr: false
});

interface CartTableProps {
  cart: CartItemType[];
}

const CartTable: FC<CartTableProps> = ({ cart }) => {
  return (
    <div className='col-lg-10 col-xl-7 m-lr-auto m-b-50'>
      <div className='m-l-25 m-r--38 m-lr-0-xl'>
        {cart.length ? (
          <>
            <div className='wrap-table-shopping-cart'>
              <table className='table-shopping-cart'>
                <tbody>
                  <tr className='table_head'>
                    <th className='column-1'>Product</th>
                    <th className='column-2'></th>
                    <th className='column-3'>Price</th>
                    <th className='column-4'>Quantity</th>
                    <th className='column-5'>Total</th>
                  </tr>
                  {cart.map(item => (
                    <CartItem key={item.product.id} product={item.product} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm'>
              <div className='flex-w flex-m m-r-20 m-tb-5'>
                <input
                  className='stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5'
                  type='text'
                  name='coupon'
                  placeholder='Coupon Code'
                />
                <div className='flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5'>
                  Apply coupon
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className='mtext-112 cl2 txt-center'>Cart is Empty...</p>
        )}
      </div>
    </div>
  );
};

export default CartTable;
