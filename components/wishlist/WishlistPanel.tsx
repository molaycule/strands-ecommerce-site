import dynamic from 'next/dynamic';
import { useWishlistStore } from 'store/useWishlistStore';
import { Utils } from 'utils';

const WishlistPanelItem = dynamic(() => import('./WishlistPanelItem'), {
  ssr: false
});

const WishlistPanel = () => {
  const wishlist = useWishlistStore(state => state.wishlist);

  return (
    <div className='wrap-header-wishlist js-panel-wishlist'>
      <div className='s-full js-hide-wishlist'></div>
      <div className='header-wishlist flex-col-l p-l-65 p-r-25'>
        <div className='header-wishlist-title flex-w flex-sb-m p-b-8'>
          <span className='mtext-103 cl2'>Your Wishlist</span>
          <div
            className='fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-wishlist'
            onClick={Utils.toggleWishlistPanelHandler}>
            <i className='zmdi zmdi-close'></i>
          </div>
        </div>
        <div className='header-wishlist-content flex-w js-pscroll'>
          {wishlist.length ? (
            <ul className='header-wishlist-wrapitem w-full'>
              {wishlist.map(item => (
                <WishlistPanelItem
                  key={item.id}
                  productId={item.id}
                  imageUrl={item.mainImage.publicUrl}
                  itemName={item.name}
                  price={item.price}
                />
              ))}
            </ul>
          ) : (
            <div>Wishlist is Empty...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPanel;
