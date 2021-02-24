import BannerSlide from 'components/banner/BannerSlide';
import TopCategories from 'components/categories/TopCategories';
import ProductOverview from 'components/products/ProductOverview';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';
import { useSpring, animated } from 'react-spring';

export default function Home() {
  const animProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <PageWrapper isHomePage>
      <animated.div style={animProps}>
        <BannerSlide />
        <TopCategories />
        <ProductOverview />
        <ProductItemModal />
      </animated.div>
    </PageWrapper>
  );
}
