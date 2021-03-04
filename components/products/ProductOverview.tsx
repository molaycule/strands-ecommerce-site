import { FC, useRef, useState } from 'react';
import { ProductCategory } from 'enums';
import { Utils } from 'utils';
import ProductFilter from './ProductFilter';
import ProductItem, { ProductItemProps } from './ProductItem';
import ProductOverviewHeader from './ProductOverviewHeader';
import ProductSearch from './ProductSearch';

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
  const productItems: Array<ProductItem> = [
    {
      id: 1,
      name: 'Esprit Ruffle Shirt',
      category: 'Women',
      price: '16.64',
      imageUrl: 'images/product-01.jpg'
    },
    {
      id: 2,
      name: 'Herschel supply',
      category: 'Women',
      price: '35.31',
      imageUrl: 'images/product-02.jpg'
    },
    {
      id: 3,
      name: 'Only Check Trouser',
      category: 'Men',
      price: '25.50',
      imageUrl: 'images/product-03.jpg'
    },
    {
      id: 4,
      name: 'Classic Trench Coat',
      category: 'Women',
      price: '75.00',
      imageUrl: 'images/product-04.jpg'
    },
    {
      id: 5,
      name: 'Front Pocket Jumper',
      category: 'Women',
      price: '34.75',
      imageUrl: 'images/product-05.jpg'
    },
    {
      id: 6,
      name: 'Vintage Inspired Classic',
      category: 'Watches',
      price: '93.20',
      imageUrl: 'images/product-06.jpg'
    },
    {
      id: 7,
      name: 'Shirt in Stretch Cotton',
      category: 'Women',
      price: '52.66',
      imageUrl: 'images/product-07.jpg'
    },
    {
      id: 8,
      name: 'Pieces Metallic Printed',
      category: 'Women',
      price: '18.96',
      imageUrl: 'images/product-08.jpg'
    },
    {
      id: 9,
      name: 'Converse All Star Hi Plimsolls',
      category: 'Shoes',
      price: '75.00',
      imageUrl: 'images/product-09.jpg'
    },
    {
      id: 10,
      name: 'Femme T-Shirt In Stripe',
      category: 'Women',
      price: '25.85',
      imageUrl: 'images/product-10.jpg'
    },
    {
      id: 11,
      name: 'Herschel supply',
      category: 'Men',
      price: '63.16',
      imageUrl: 'images/product-11.jpg'
    },
    {
      id: 12,
      name: 'Herschel supply',
      category: 'Men',
      price: '63.16',
      imageUrl: 'images/product-12.jpg'
    },
    {
      id: 13,
      name: 'T-Shirt with Sleeve',
      category: 'Women',
      price: '18.49',
      imageUrl: 'images/product-13.jpg'
    },
    {
      id: 14,
      name: 'Pretty Little Thing',
      category: 'Women',
      price: '54.79',
      imageUrl: 'images/product-14.jpg'
    },
    {
      id: 15,
      name: 'Mini Silver Mesh Watch',
      category: 'Watches',
      price: '86.85',
      imageUrl: 'images/product-15.jpg'
    },
    {
      id: 16,
      name: 'Square Neck Back',
      category: 'Women',
      price: '29.64',
      imageUrl: 'images/product-16.jpg'
    }
  ];
  const [filteredProducts, setFilteredProducts] = useState(productItems);

  const productFilterHandler = (filterCategory: string) => {
    if (!productItems) return;

    setFilteredProducts(
      productItems.filter(item =>
        filterCategory === null ? true : item.category === filterCategory
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
          <ProductSearch panelSearchRef={panelSearchRef} />
          <ProductFilter panelFilterRef={panelFilterRef} />
        </div>
        <div className='row'>
          {filteredProducts.map(item => (
            <ProductItem
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
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
