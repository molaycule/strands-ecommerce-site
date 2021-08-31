import PageWrapper from 'components/common/PageWrapper';
import ProductItemModal from 'components/products/ProductItemModal';
import ProductOverview from 'components/products/ProductOverview';
import { useQuery } from '@apollo/client';
import { TOP_CATEGORIES } from 'graphql/queries';
import { AllTopCategories } from 'types';

const products = () => {
  const { data } = useQuery<AllTopCategories>(TOP_CATEGORIES);

  return (
    <PageWrapper allTopCategories={data?.allTopCategories}>
      <ProductOverview showTitle={false} />
      <ProductItemModal />
    </PageWrapper>
  );
};

export default products;
