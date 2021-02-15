import { FC, LegacyRef, useState } from 'react';
import { ProductCategory } from 'enums';

interface ProductOverviewHeaderProps {
  productFilterHandler: (filterCategory: ProductCategory) => void;
  showFilterRef?: LegacyRef<HTMLDivElement>;
  showFilterHandler?: () => void;
  showSearchRef?: LegacyRef<HTMLDivElement>;
  showSearchHandler?: () => void;
}

const ProductOverviewHeader: FC<ProductOverviewHeaderProps> = ({
  productFilterHandler,
  showFilterRef,
  showFilterHandler,
  showSearchRef,
  showSearchHandler
}) => {
  const [activeCategory, setActiveCategory] = useState(ProductCategory.All);

  const activeCategoryAndFilterHandler = (category: ProductCategory) => {
    setActiveCategory(category);
    productFilterHandler(category);
  };

  return (
    <>
      <div className='flex-w flex-l-m filter-tope-group m-tb-10'>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.All && 'how-active1'
          }`}
          onClick={() => activeCategoryAndFilterHandler(ProductCategory.All)}>
          All Products
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.Women && 'how-active1'
          }`}
          onClick={() => activeCategoryAndFilterHandler(ProductCategory.Women)}>
          Women
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.Men && 'how-active1'
          }`}
          onClick={() => activeCategoryAndFilterHandler(ProductCategory.Men)}>
          Men
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.Bag && 'how-active1'
          }`}
          onClick={() => activeCategoryAndFilterHandler(ProductCategory.Bag)}>
          Bag
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.Shoes && 'how-active1'
          }`}
          onClick={() => activeCategoryAndFilterHandler(ProductCategory.Shoes)}>
          Shoes
        </button>
        <button
          className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
            activeCategory === ProductCategory.Watches && 'how-active1'
          }`}
          onClick={() =>
            activeCategoryAndFilterHandler(ProductCategory.Watches)
          }>
          Watches
        </button>
      </div>
      {(showFilterRef || showSearchRef) && (
        <div className='flex-w flex-c-m m-tb-10'>
          {showFilterRef && (
            <div
              className='flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter'
              ref={showFilterRef}
              onClick={showFilterHandler}>
              <i className='icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list'></i>
              <i className='icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none'></i>{' '}
              Filter
            </div>
          )}
          {showSearchRef && (
            <div
              className='flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search'
              ref={showSearchRef}
              onClick={showSearchHandler}>
              <i className='icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search'></i>
              <i className='icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none'></i>{' '}
              Search
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductOverviewHeader;
