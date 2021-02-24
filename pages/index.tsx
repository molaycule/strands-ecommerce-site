import BannerSlide from 'components/banner/BannerSlide';
import TopCategories from 'components/categories/TopCategories';
import ProductOverview from 'components/products/ProductOverview';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';

export default function Home() {
  return (
    <PageWrapper isHomePage>
      <BannerSlide />
      <TopCategories />
      <ProductOverview />
      <ProductItemModal />
    </PageWrapper>
  );
}
