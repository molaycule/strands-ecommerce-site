import BannerSlide from 'components/banner/BannerSlide';
import TopCategories from 'components/categories/TopCategories';
import ProductOverview from 'components/products/ProductOverview';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';
import { useSpring, animated } from 'react-spring';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const animProps = useSpring({
    opacity: 1,
    from: { opacity: Cookies.get('onload') ? 1 : 0 },
    delay: 750
  });

  useEffect(() => {
    Cookies.set('onload', 'true');
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
