import { FC, useRef, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Utils } from 'utils';
import ProductFilter from './ProductFilter';
import ProductItem, { ProductItemProps } from './ProductItem';
import ProductOverviewHeader from './ProductOverviewHeader';
import ProductSearch from './ProductSearch';
import { ALL_PRODUCTS } from 'graphql/queries';
import { AllProducts, Product } from 'types';

export interface ProductItem extends ProductItemProps {
  id: number;
  category: string;
}

interface ProductOverviewProps {
  showTitle?: boolean;
}

const ProductOverview: FC<ProductOverviewProps> = ({ showTitle = true }) => {
  const showSearchRef = useRef<HTMLDivElement>(null);
  const panelSearchRef = useRef<HTMLDivElement>(null);
  const showFilterRef = useRef<HTMLDivElement>(null);
  const panelFilterRef = useRef<HTMLDivElement>(null);
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { data } = useQuery<AllProducts>(ALL_PRODUCTS, {
    variables: { search: searchProduct, categoryName: activeCategory }
  });

  const productFilterHandler = (filterCategory: string) => {
    if (!data) return;

    setActiveCategory(filterCategory);
    setFilteredProducts(
      data.allProducts.filter(product =>
        filterCategory === null
          ? true
          : product.category.name === filterCategory
      )
    );
  };

  const showSearchHandler = () => {
    if (!showFilterRef.current) return;
    showSearchRef.current.classList.toggle('show-search');
    Utils.slideToggle(panelSearchRef.current, 400);
  };

  const showFilterHandler = () => {
    if (!panelFilterRef.current) return;
    showFilterRef.current.classList.toggle('show-filter');
    Utils.slideToggle(panelFilterRef.current, 400);
  };

  useEffect(() => {
    if (data) {
      setFilteredProducts(data.allProducts);
    }
  }, [data]);

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
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className='flex-c-m flex-w w-full p-t-45'>
          <a
            href='#'
            className='flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04'>
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
