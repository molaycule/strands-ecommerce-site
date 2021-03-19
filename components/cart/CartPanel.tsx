import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Utils } from 'utils';
import { useCartStore } from 'store/useCartStore';
import routes from 'routes';

const CartPanelItem = dynamic(() => import('./CartPanelItem'), { ssr: false });

const CartPanel = () => {
  const cart = useCartStore(state => state.cart);
  const getCartTotalPrice = useCartStore(state => state.getCartTotalPrice);

  return (
    <div className='wrap-header-cart js-panel-cart'>
      <div className='s-full js-hide-cart'></div>
      <div className='header-cart flex-col-l p-l-65 p-r-25'>
        <div className='header-cart-title flex-w flex-sb-m p-b-8'>
          <span className='mtext-103 cl2'>Your Cart</span>
          <div
            className='fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart'
            onClick={Utils.toggleCartPanelHandler}>
            <i className='zmdi zmdi-close'></i>
          </div>
        </div>
        <div className='header-cart-content flex-w js-pscroll'>
          {cart.length ? (
            <ul className='header-cart-wrapitem w-full'>
              {cart.map(item => (
                <CartPanelItem
                  key={item.product.id}
                  productId={item.product.id}
                  imageUrl={item.product.mainImage.publicUrl}
                  itemName={item.product.name}
                  quantity={item.quantity}
                  price={item.product.price}
                />
              ))}
            </ul>
          ) : (
            <div>Cart is Empty...</div>
          )}
          <div className='w-full'>
            <div className='header-cart-total w-full p-tb-40'>
              Total: ₦{getCartTotalPrice().toFixed(2)}
            </div>
            <div className='header-cart-buttons flex-w w-full'>
              <Link href={routes.cart}>
                <a className='flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10'>
                  View Cart
                </a>
              </Link>
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
