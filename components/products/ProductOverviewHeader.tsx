import { FC, LegacyRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { ALL_CATEGORIES } from 'graphql/queries';
import { AllCategories } from 'types';

interface ProductOverviewHeaderProps {
  productFilterHandler: (filterCategory: string) => void;
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
  const router = useRouter();
  const { data } = useQuery<AllCategories>(ALL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>(null);

  const activeCategoryAndFilterHandler = (categoryName: string) => {
    setActiveCategory(categoryName?.toLowerCase());
    productFilterHandler(categoryName);
  };

  useEffect(() => {
    if (router.query['category']) {
      const categoryName = router.query['category'].toString().toLowerCase();
      setActiveCategory(categoryName !== 'all' ? categoryName : null);
    } else {
      setActiveCategory(null);
    }
  }, [router.query]);

  return (
    <>
      <div className='flex-w flex-l-m filter-tope-group m-tb-10'>
        <Link
          href={{
            pathname: router.pathname,
            query: { ...router.query, category: 'all' }
          }}
          shallow>
          <a
            className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
              activeCategory === null && 'how-active1'
            }`}
            onClick={() => activeCategoryAndFilterHandler(null)}>
            All Products
          </a>
        </Link>
        {data?.allCategories.map(category => (
          <Link
            key={category.id}
            href={{
              pathname: router.pathname,
              query: { ...router.query, category: category.name.toLowerCase() }
            }}
            shallow>
            <a
              className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                activeCategory === category.name.toLowerCase() && 'how-active1'
              }`}
              onClick={() => activeCategoryAndFilterHandler(category.name)}>
              {category.name}
            </a>
          </Link>
        ))}
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
