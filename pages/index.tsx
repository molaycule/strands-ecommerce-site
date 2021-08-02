import Head from 'next/head';
import dynamic from 'next/dynamic';
import ProductItemModal from 'components/products/ProductItemModal';
import PageWrapper from 'components/common/PageWrapper';
import { useSpring, animated } from 'react-spring';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';
import { TOP_CATEGORIES } from 'graphql/queries';
import { AllTopCategories } from 'types';

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
  const { data } = useQuery<AllTopCategories>(TOP_CATEGORIES);

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
      <Head>
        <script
          id='mcjs'
          type='text/javascript'
          src='/static/mailchimp.js'></script>
        <script type='text/javascript' src='/static/tawkto.js'></script>
      </Head>
      <PageWrapper isHomePage allTopCategories={data?.allTopCategories}>
        <BannerSlide />
        <TopCategories allTopCategories={data?.allTopCategories} />
        <ProductOverview />
        <ProductItemModal />
      </PageWrapper>
    </animated.div>
  );
}
