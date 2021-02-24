import { Utils } from 'utils';
import CartPanelItem, { CartPanelItemProps } from './CartPanelItem';

const CartPanel = () => {
  const items: Array<CartPanelItemProps> = [
    {
      imageUrl: 'images/item-cart-01.jpg',
      itemName: 'White Shirt Pleat',
      quantity: 1,
      price: '19.00'
    },
    {
      imageUrl: 'images/item-cart-02.jpg',
      itemName: 'Converse All Star',
      quantity: 1,
      price: '39.00'
    },
    {
      imageUrl: 'images/item-cart-03.jpg',
      itemName: 'Nixon Porter Leather',
      quantity: 1,
      price: '17.00'
    }
  ];
  return (
    <div className='wrap-header-cart js-panel-cart'>
      <div className='s-full js-hide-cart'></div>
      <div className='header-cart flex-col-l p-l-65 p-r-25'>
        <div className='header-cart-title flex-w flex-sb-m p-b-8'>
          <span className='mtext-103 cl2'>Your Cart</span>
          <div
            className='fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart'
            onClick={Utils.showCartPanelHandler}>
            <i className='zmdi zmdi-close'></i>
          </div>
        </div>
        <div className='header-cart-content flex-w js-pscroll'>
          <ul className='header-cart-wrapitem w-full'>
            {items.map(item => (
              <CartPanelItem
                imageUrl={item.imageUrl}
                itemName={item.itemName}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </ul>
          <div className='w-full'>
            <div className='header-cart-total w-full p-tb-40'>
              Total: ₦
              {items
                .map(item => Number(item.price))
                .reduce((acc, cur) => acc + cur)
                .toFixed(2)}
            </div>
            <div className='header-cart-buttons flex-w w-full'>
              <a
                href='shoping-cart.html'
                className='flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10'>
                View Cart
              </a>
              <a
                href='shoping-cart.html'
                className='flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10'>
                Check Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
