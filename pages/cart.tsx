import dynamic from 'next/dynamic';
import PageWrapper from 'components/common/PageWrapper';
import { useQuery } from '@apollo/client';
import { TOP_CATEGORIES } from 'graphql/queries';
import { AllTopCategories } from 'types';

const CartContainer = dynamic(() => import('components/cart/CartContainer'), {
  ssr: false
});

const cart = () => {
  const { data } = useQuery<AllTopCategories>(TOP_CATEGORIES);

  return (
    <PageWrapper allTopCategories={data?.allTopCategories}>
      <CartContainer checkout={false} />
    </PageWrapper>
  );
};

export default cart;
