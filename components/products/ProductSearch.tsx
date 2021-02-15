import { FC, LegacyRef } from 'react';

interface ProductSearchProps {
  panelSearchRef?: LegacyRef<HTMLDivElement>;
}

const ProductSearch: FC<ProductSearchProps> = ({ panelSearchRef }) => {
  if (!panelSearchRef) return null;

  return (
    <div
      className='dis-none panel-search w-full p-t-10 p-b-15'
      ref={panelSearchRef}>
      <div className='bor8 dis-flex p-l-15'>
        <button className='size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04'>
          <i className='zmdi zmdi-search'></i>
        </button>
        <input
          className='mtext-107 cl2 size-114 plh2 p-r-15'
          type='text'
          name='search-product'
          placeholder='Search'
        />
      </div>
    </div>
  );
};

export default ProductSearch;
