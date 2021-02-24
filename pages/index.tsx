import BannerSlide from 'components/banner/BannerSlide';
import TopCategories from 'components/categories/TopCategories';
import ProductOverview from 'components/products/ProductOverview';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';
import Page from 'react-page-loading';

export default function Home() {
  return (
    <Page loader='bubble' color='#c56439' size={3}>
      <PageWrapper isHomePage>
        <BannerSlide />
        <TopCategories />
        <ProductOverview />
        <ProductItemModal />
      </PageWrapper>
    </Page>
  );
}
