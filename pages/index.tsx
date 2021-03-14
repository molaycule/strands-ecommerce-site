import dynamic from 'next/dynamic';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';
import { useSpring, animated } from 'react-spring';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const BannerSlide = dynamic(() => import('components/banner/BannerSlide'), {
  ssr: false
});

const TopCategories = dynamic(
  () => import('components/categories/TopCategories'),
  { ssr: false }
);

const ProductOverview = dynamic(
  () => import('components/products/ProductOverview'),
  { ssr: false }
);

export default function Home() {
  const animProps = useSpring({
    opacity: 1,
    from: { opacity: Cookies.get('onload') ? 1 : 0 },
    delay: 750
  });

  useEffect(() => {
    Cookies.set('onload', 'true', { sameSite: 'strict' });
  }, []);

  return (
    <animated.div style={animProps}>
      <PageWrapper isHomePage>
        <BannerSlide />
        <TopCategories />
        <ProductOverview />
        <ProductItemModal />
      </PageWrapper>
    </animated.div>
  );
}
