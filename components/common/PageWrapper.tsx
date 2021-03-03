import CartPanel from 'components/cart/CartPanel';
import { PageHeaderLinks } from 'enums';
import Footer from 'layout/footer/Footer';
import Header from 'layout/header/Header';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { FC, ReactNode, useEffect, useState } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import routes from 'routes';
import BackToTop from './BackToTop';
import CookieConsent from 'react-cookie-consent';

interface PageWrapperProps {
  isHomePage?: boolean;
  children: ReactNode | ReactNode[];
}

const PageWrapper: FC<PageWrapperProps> = ({
  isHomePage = false,
  children
}) => {
  const appName = 'Strands';
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [activeLink, setActiveLink] = useState<PageHeaderLinks>();

  useEffect(() => {
    let pageHeaderLink: PageHeaderLinks;
    let pageTitle: string;
    switch (router.pathname) {
      case routes.home:
        pageHeaderLink = PageHeaderLinks.Home;
        pageTitle = `${appName} | Home`;
        break;
      case routes.products:
        pageHeaderLink = PageHeaderLinks.Products;
        pageTitle = `${appName} | Products`;
        break;
      case routes.cart:
        pageHeaderLink = PageHeaderLinks.Cart;
        pageTitle = `${appName} | Cart`;
        break;
      case routes.about:
        pageHeaderLink = PageHeaderLinks.About;
        pageTitle = `${appName} | About`;
        break;
      case routes.contact:
        pageHeaderLink = PageHeaderLinks.Contact;
        pageTitle = `${appName} | Contact`;
        break;
      default:
        pageHeaderLink = PageHeaderLinks.Home;
        pageTitle = `${appName} | Home`;
        break;
    }
    setActiveLink(pageHeaderLink);
    setTitle(pageTitle);
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
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
      </Head>
      <Header isHomePage={isHomePage} activeLink={activeLink} />
      {children}
      <CartPanel />
      <Footer />
      <ScrollToTop smooth component={<BackToTop scale={0.5} />} />
      <CookieConsent
        location='bottom'
        buttonText='Accept'
        buttonStyle={{
          borderRadius: 23,
          backgroundColor: '#c56439',
          color: '#fff'
        }}
        buttonClasses='flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn4 p-lr-15 trans-04'>
        By using our site you agree to our use of cookies to deliver a better
        site experience.
      </CookieConsent>
    </div>
  );
};

export default PageWrapper;
