import Head from 'next/head';
import Header from 'layout/header/Header';
import Footer from 'layout/footer/Footer';
import BannerSlide from 'components/banner/BannerSlide';
import TopCategories from 'components/categories/TopCategories';
import ProductOverview from 'components/products/ProductOverview';
import CartPanel from 'components/cart/CartPanel';
import ScrollToTop from 'react-scroll-to-top';
import BackToTop from 'components/common/BackToTop';
import ProductItemModal from 'components/products/ProductItemModal';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.linearicons.com/free/1.0.0/icon-font.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css'
          integrity='sha512-+mlclc5Q/eHs49oIOCxnnENudJWuNqX5AogCiqRBgKnpoplPzETg2fkgBFVC6WYUVxYYljuxPNG8RE7yBy1K+g=='
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-daterangepicker/3.0.5/daterangepicker.min.css'
          integrity='sha512-rBi1cGvEdd3NmSAQhPWId5Nd6QxE8To4ADjM2a6n0BrqQdisZ/RPUlm0YycDzvNL1HHAh1nKZqI0kSbif+5upQ=='
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css'
        />
      </Head>

      <Header />
      <CartPanel />
      <BannerSlide />
      <TopCategories />
      <ProductOverview />
      <ProductItemModal />
      <Footer />
      <ScrollToTop smooth component={<BackToTop scale={0.5} />} />
    </div>
  );
}
