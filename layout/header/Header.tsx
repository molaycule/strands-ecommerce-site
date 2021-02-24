import { FC, useEffect, useRef } from 'react';
import { Utils } from 'utils';
import Link from 'next/link';
import routes from 'routes';
import { PageHeaderLinks } from 'enums';

interface HeaderProps {
  isHomePage: boolean;
  activeLink: PageHeaderLinks;
}

const Header: FC<HeaderProps> = ({ isHomePage, activeLink }) => {
  const headerDesktopRef = useRef<HTMLDivElement>(null);
  const wrapMenuRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const showCartRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
    if (!topBarRef?.current?.clientHeight) return;

    if (window.scrollY > topBarRef.current.clientHeight) {
      headerDesktopRef.current.classList.add('fix-menu-desktop');
      wrapMenuRef.current.style.top = '0';
    } else {
      headerDesktopRef.current.classList.remove('fix-menu-desktop');
      wrapMenuRef.current.style.top = (
        topBarRef.current.clientHeight - window.scrollY
      )
        .toString()
        .concat('px');
    }
  };

  const resizeHandler = () => {
    if (window.innerWidth >= 992) {
      if (window.getComputedStyle(mobileMenuRef.current).display === 'block') {
        mobileMenuRef.current.style.display = 'none';
        hamburgerRef.current.classList.toggle('is-active');
      }
    }
  };

  const showMobileMenuHandler = () => {
    hamburgerRef.current.classList.toggle('is-active');
    Utils.slideToggle(mobileMenuRef.current, 500);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
  }, []);

  return (
    <header className={!isHomePage ? 'header-v4' : null}>
      <div className='container-menu-desktop' ref={headerDesktopRef}>
        <div className='top-bar' ref={topBarRef}>
          <div className='content-topbar flex-sb-m h-full container'>
            <div className='left-top-bar'>
              Free shipping for standard order over $100
            </div>
            <div className='right-top-bar flex-w h-full'>
              <a href='#' className='flex-c-m trans-04 p-lr-25'>
                Help & FAQs
              </a>
              <a href='#' className='flex-c-m trans-04 p-lr-25'>
                My Account
              </a>
              <a href='#' className='flex-c-m trans-04 p-lr-25'>
                EN
              </a>
              <a href='#' className='flex-c-m trans-04 p-lr-25'>
                NGN
              </a>
            </div>
          </div>
        </div>
        <div
          className={`wrap-menu-desktop ${!isHomePage ? 'how-shadow1' : null}`}
          ref={wrapMenuRef}>
          <nav className='limiter-menu-desktop container'>
            <Link href={routes.home}>
              <a className='logo'>
                <div className='img-logo' />
              </a>
            </Link>

            <div className='menu-desktop'>
              <ul className='main-menu'>
                <li
                  className={
                    activeLink === PageHeaderLinks.Home ? 'active-menu' : null
                  }>
                  <Link href={routes.home}>
                    <a>Home</a>
                  </Link>
                </li>
                <li
                  className={
                    activeLink === PageHeaderLinks.Products
                      ? 'active-menu'
                      : null
                  }>
                  <Link href={routes.products}>
                    <a>Products</a>
                  </Link>
                </li>
                <li
                  className={
                    activeLink === PageHeaderLinks.Cart ? 'active-menu' : null
                  }>
                  <Link href={routes.cart}>
                    <a>Shopping Cart</a>
                  </Link>
                </li>
                <li
                  className={
                    activeLink === PageHeaderLinks.About ? 'active-menu' : null
                  }>
                  <Link href={routes.about}>
                    <a>About</a>
                  </Link>
                </li>
                <li
                  className={
                    activeLink === PageHeaderLinks.Contact
                      ? 'active-menu'
                      : null
                  }>
                  <Link href={routes.contact}>
                    <a>Contact</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className='wrap-icon-header flex-w flex-r-m'>
              <div
                className='icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart'
                data-notify='2'
                ref={showCartRef}
                onClick={Utils.showCartPanelHandler}>
                <i className='zmdi zmdi-shopping-cart'></i>
              </div>
              <a
                href='#'
                className='dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti'
                data-notify='0'>
                <i className='zmdi zmdi-favorite-outline'></i>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className='wrap-header-mobile'>
        <div className='logo-mobile'>
          <Link href={routes.home}>
            <a>
              <div className='img-logo-mobile' />
            </a>
          </Link>
        </div>

        <div className='wrap-icon-header flex-w flex-r-m m-r-15'>
          <div
            className='icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart'
            data-notify='2'
            onClick={Utils.showCartPanelHandler}>
            <i className='zmdi zmdi-shopping-cart'></i>
          </div>
          <a
            href='#'
            className='dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti'
            data-notify='0'>
            <i className='zmdi zmdi-favorite-outline'></i>
          </a>
        </div>

        <div
          className='btn-show-menu-mobile hamburger hamburger--squeeze'
          ref={hamburgerRef}
          onClick={showMobileMenuHandler}>
          <span className='hamburger-box'>
            <span className='hamburger-inner'></span>
          </span>
        </div>
      </div>

      <div className='menu-mobile' ref={mobileMenuRef}>
        <ul className='topbar-mobile'>
          <li>
            <div className='left-top-bar'>
              Free shipping for standard order over $100
            </div>
          </li>
          <li>
            <div className='right-top-bar flex-w h-full'>
              <a href='#' className='flex-c-m p-lr-10 trans-04'>
                Help & FAQs
              </a>
              <a href='#' className='flex-c-m p-lr-10 trans-04'>
                My Account
              </a>
              <a href='#' className='flex-c-m p-lr-10 trans-04'>
                EN
              </a>
              <a href='#' className='flex-c-m p-lr-10 trans-04'>
                NGN
              </a>
            </div>
          </li>
        </ul>
        <ul className='main-menu-m'>
          <li>
            <Link href={routes.home}>
              <a href='index.html'>Home</a>
            </Link>
          </li>
          <li>
            <Link href={routes.products}>
              <a>Products</a>
            </Link>
          </li>
          <li>
            <Link href={routes.cart}>
              <a>Shopping Cart</a>
            </Link>
          </li>
          <li>
            <Link href={routes.about}>
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href={routes.contact}>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
