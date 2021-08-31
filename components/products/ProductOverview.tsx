import { FC, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { Utils } from 'utils';
import ProductFilter from './ProductFilter';
import ProductItem, { ProductItemProps } from './ProductItem';
import ProductSearch from './ProductSearch';
import { ALL_PRODUCTS } from 'graphql/queries';
import {
  AllProducts,
  Product,
  ProductRepository,
  ProductRepositoryKey
} from 'types';
import { useRouter } from 'next/router';
import { SortProductsBy } from 'enums';
import Loader from 'components/common/Loader';

const ProductOverviewHeader = dynamic(() => import('./ProductOverviewHeader'), {
  ssr: false
});

export interface ProductItem extends ProductItemProps {
  id: number;
  category: string;
}

interface ProductOverviewProps {
  showTitle?: boolean;
}

const NUMBER_OF_PRODUCT = 4;
const INITIAL_SKIP = 0;

const ProductOverview: FC<ProductOverviewProps> = ({ showTitle = true }) => {
  const router = useRouter();
  const showSearchRef = useRef<HTMLDivElement>(null);
  const panelSearchRef = useRef<HTMLDivElement>(null);
  const showFilterRef = useRef<HTMLDivElement>(null);
  const panelFilterRef = useRef<HTMLDivElement>(null);
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [productRepositoryMap, setProductRepositoryMap] = useState(
    new Map<string, ProductRepository>()
  );
  const { data, loading, fetchMore } = useQuery<AllProducts>(ALL_PRODUCTS, {
    variables: {
      search: searchProduct,
      categoryName: activeCategory,
      sortBy: SortProductsBy[SortProductsBy.updatedAt_DESC],
      first: NUMBER_OF_PRODUCT,
      skip: INITIAL_SKIP
    },
    notifyOnNetworkStatusChange: true
  });

  const productFilterHandler = (filterCategory: string) => {
    setActiveCategory(filterCategory);
  };

  const showSearchHandler = () => {
    if (!panelSearchRef.current) return;
    showSearchRef.current.classList.toggle('show-search');
    Utils.slideToggle(panelSearchRef.current, 400);
  };

  const showFilterHandler = () => {
    if (!panelFilterRef.current) return;
    showFilterRef.current.classList.toggle('show-filter');
    Utils.slideToggle(panelFilterRef.current, 400);
  };

  const loadMoreProductHandler = () => {
    fetchMore({
      variables: {
        search: searchProduct,
        categoryName: activeCategory,
        sortBy: SortProductsBy[SortProductsBy.updatedAt_DESC],
        first: NUMBER_OF_PRODUCT,
        skip: productRepositoryMap.get(
          JSON.stringify({ category: activeCategory, search: searchProduct })
        )?.products.size
      }
    });
  };

  const canLoadMoreProducts = () => {
    const key = JSON.stringify({
      category: activeCategory,
      search: searchProduct
    });
    return (
      (productRepositoryMap.get(key)?.products.size ?? -1) <
      (productRepositoryMap.get(key)?.total ?? 0)
    );
  };

  const productMapCallback = (
    category: string,
    search: string,
    productMapState: Map<string, ProductRepository>,
    product: Product,
    productCount: number
  ) => {
    const key = JSON.stringify({ category, search });
    const productRepository = productMapState.get(key);

    if (productRepository) {
      productMapState.set(key, {
        ...productRepository,
        products: productRepository.products.set(product.id, product),
        total: productCount
      });
    } else {
      productMapState.set(key, {
        ...productRepository,
        products: new Map().set(product.id, product),
        total: productCount
      });
    }

    return productMapState;
  };

  useEffect(() => {
    if (data) {
      data.allProducts.forEach(product => {
        setProductRepositoryMap(state => {
          let newState = new Map<string, ProductRepository>(state);
          newState = productMapCallback(
            activeCategory,
            searchProduct,
            newState,
            product,
            data._allProductsMeta.count
          );
          return newState;
        });
      });
    }
  }, [data]);

  useEffect(() => {
    if (!activeCategory && router.query['category']) {
      const categoryName = router.query['category'].toString();
      setActiveCategory(
        categoryName.toLowerCase() !== 'all'
          ? `${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`
          : null
      );
      productFilterHandler(categoryName.toUpperCase());
    }

    if (!searchProduct && router.query['search']) {
      setSearchProduct(router.query['search'].toString());
    }
  }, [router.query]);

  useEffect(() => {
    if (searchProduct) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, search: searchProduct }
        },
        undefined,
        { shallow: true }
      );
    } else {
      delete router.query['search'];
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query }
        },
        undefined,
        { shallow: true }
      );
    }
  }, [searchProduct]);

  return (
    <section className='bg0 p-t-23 p-b-140'>
      <div className='container'>
        {showTitle && (
          <div className='p-b-10'>
            <h3 className='ltext-103 cl5'>Product Overview</h3>
          </div>
        )}
        <div className='flex-w flex-sb-m p-b-52'>
          <ProductOverviewHeader
            productFilterHandler={productFilterHandler}
            showFilterRef={showFilterRef}
            showFilterHandler={showFilterHandler}
            showSearchRef={showSearchRef}
            showSearchHandler={showSearchHandler}
          />
          <ProductSearch
            panelSearchRef={panelSearchRef}
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
          />
          <ProductFilter panelFilterRef={panelFilterRef} />
        </div>
        <div className='row'>
          {loading && !productRepositoryMap.size ? (
            <Loader />
          ) : (
            <>
              {/**
               * STEP 1: Filter the productRepositoryMap key based on the active category and search products
               * STEP 2: Loop through the result of productRepository products and filter based on active category
               * STEP 3: Loop through the final result of products
               */}
              {[...productRepositoryMap]
                .filter(([key, _productRepository]) => {
                  const productRepoKey: ProductRepositoryKey = JSON.parse(key);
                  if (searchProduct) {
                    return (
                      productRepoKey.category === activeCategory &&
                      productRepoKey.search === searchProduct
                    );
                  }

                  return (
                    productRepoKey.category === activeCategory &&
                    productRepoKey.search === ''
                  );
                })
                .map(([_key, productRepository]) =>
                  [...productRepository.products]
                    .filter(([_key, product]) =>
                      !activeCategory
                        ? true
                        : product.category.name === activeCategory
                    )
                    .map(([key, product]) => (
                      <ProductItem key={key} product={product} />
                    ))
                )}
              {loading && <Loader />}
            </>
          )}
        </div>
        {canLoadMoreProducts() && !loading && (
          <div className='flex-c-m flex-w w-full p-t-45'>
            <button
              className='flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04'
              onClick={loadMoreProductHandler}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductOverview;
