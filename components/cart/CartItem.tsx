import { FC, useState } from 'react';
import { Utils } from 'utils';

export interface CartItemProps {
  imageUrl: string;
  itemName: string;
  price: string;
}

const CartItem: FC<CartItemProps> = ({ imageUrl, itemName, price }) => {
  const [numberOfProduct, setNumberOfProduct] = useState(1);

  return (
    <tr className='table_row'>
      <td className='column-1'>
        <div className='how-itemcart1'>
          <img src={imageUrl} alt='IMG' />
        </div>
      </td>
      <td className='column-2'>{itemName}</td>
      <td className='column-3'>₦{price}</td>
      <td className='column-4'>
        <div className='wrap-num-product flex-w m-l-auto m-r-0'>
          <div
            className='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'
            onClick={() => Utils.decrementNumberOfProduct(setNumberOfProduct)}>
            <i className='fs-16 zmdi zmdi-minus'></i>
          </div>
          <input
            className='mtext-104 cl3 txt-center num-product'
            type='number'
            name='num-product1'
            value={numberOfProduct}
            onChange={e => setNumberOfProduct(Number(e.target.value))}
          />
          <div
            className='btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'
            onClick={() => Utils.incrementNumberOfProduct(setNumberOfProduct)}>
            <i className='fs-16 zmdi zmdi-plus'></i>
          </div>
        </div>
      </td>
      <td className='column-5'>
        ₦{(numberOfProduct * Number(price)).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
