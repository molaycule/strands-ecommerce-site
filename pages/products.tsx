import PageWrapper from 'components/common/PageWrapper';
import ProductItemModal from 'components/products/ProductItemModal';
import ProductOverview from 'components/products/ProductOverview';

const products = () => {
  return (
    <PageWrapper>
      <ProductOverview showTitle={false} />
      <ProductItemModal />
    </PageWrapper>
  );
};

export default products;
