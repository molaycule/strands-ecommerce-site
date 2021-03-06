import { FC } from 'react';
import { useWishlistStore } from 'store/useWishlistStore';

export interface WishlistPanelItemProps {
  productId: string;
  imageUrl: string;
  itemName: string;
  price: number;
}

const WishlistPanelItem: FC<WishlistPanelItemProps> = ({
  productId,
  imageUrl,
  itemName,
  price
}) => {
  const removeFromWishlistHandler = useWishlistStore(
    state => state.removeFromWishlistHandler
  );
  return (
    <li className='header-wishlist-item flex-w flex-t m-b-12'>
      <div
        className='header-wishlist-item-img'
        onClick={() => removeFromWishlistHandler(productId)}>
        <img src={imageUrl} alt='IMG' />
      </div>
      <div className='header-wishlist-item-txt p-t-6'>
        <a
          href='#'
          className='header-wishlist-item-name m-b-4 hov-cl1 trans-04'>
          {itemName}
        </a>
        <span className='header-wishlist-item-info'>₦{price.toFixed(2)}</span>
        <a
          className='header-wishlist-item-info hov-cl1 pointer'
          onClick={() => removeFromWishlistHandler(productId)}>
          Remove
        </a>
      </div>
    </li>
  );
};

export default WishlistPanelItem;
