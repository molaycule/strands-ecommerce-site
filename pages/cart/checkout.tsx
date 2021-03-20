import dynamic from 'next/dynamic';
import PageWrapper from 'components/common/PageWrapper';

const CartContainer = dynamic(() => import('components/cart/CartContainer'), {
  ssr: false
});

const checkout = () => {
  return (
    <PageWrapper>
      <CartContainer checkout />
    </PageWrapper>
  );
};

export default checkout;
