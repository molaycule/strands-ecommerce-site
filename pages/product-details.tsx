import PageWrapper from 'components/common/PageWrapper';
import ProductItemModal from 'components/products/ProductItemModal';
import ProductOverview from 'components/products/ProductOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import routes from 'routes';

const products = () => {
  return (
    <PageWrapper>
      <div className='container'>
        <div className='bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg'>
          <Link href={routes.home}>
            <a className='stext-109 cl8 hov-cl1 trans-04'>
              Home
              <FontAwesomeIcon
                icon='angle-right'
                className='m-l-9 m-r-10'
                width={4.5}
                height={12}
              />
            </a>
          </Link>
          <Link href={routes.home}>
            <a className='stext-109 cl8 hov-cl1 trans-04'>
              Men
              <FontAwesomeIcon
                icon='angle-right'
                className='m-l-9 m-r-10'
                width={4.5}
                height={12}
              />
            </a>
          </Link>
          <span className='stext-109 cl4'>Lightweight Jacket</span>
        </div>
      </div>
      <ProductOverview showTitle={false} />
      <ProductItemModal />
    </PageWrapper>
  );
};

export default products;
