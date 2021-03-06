import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWishlistStore } from 'store/useWishlistStore';
import { Utils } from 'utils';

const WishlistPanelItem = dynamic(() => import('./WishlistPanelItem'), {
  ssr: false
});

const WishlistPanel = () => {
  const router = useRouter();
  const [wishlistPanelRef, setWishlistPanelRef] = useState<HTMLDivElement>();
  const wishlist = useWishlistStore(state => state.wishlist);

  useEffect(() => {
    if (!wishlistPanelRef) return;

    if (router.query['wishlist'] === 'true') {
      wishlistPanelRef.classList.add('show-header-wishlist');
    } else {
      wishlistPanelRef.classList.remove('show-header-wishlist');
    }
  }, [wishlistPanelRef]);

  return (
    <div
      className='wrap-header-wishlist js-panel-wishlist'
      ref={ref => setWishlistPanelRef(ref)}>
      <div className='s-full js-hide-wishlist'></div>
      <div className='header-wishlist flex-col-l p-l-65 p-r-25'>
        <div className='header-wishlist-title flex-w flex-sb-m p-b-8'>
          <span className='mtext-103 cl2'>Your Wishlist</span>
          <Link
            href={{
              pathname: router.pathname,
              query: { ...router.query, wishlist: false }
            }}
            shallow>
            <a
              className='fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-wishlist'
              onClick={Utils.toggleWishlistPanelHandler}>
              <i className='zmdi zmdi-close'></i>
            </a>
          </Link>
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
