import { FC, LegacyRef, useEffect, useRef } from 'react';
import { Utils } from 'utils';

const Header = () => {
  const headerDesktopRef = useRef<HTMLDivElement>(null);
  const wrapMenuRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const showCartRef = useRef<HTMLDivElement>(null);

  const scrollHandler = () => {
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
    <header>
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
                USD
              </a>
            </div>
          </div>
        </div>
        <div className='wrap-menu-desktop' ref={wrapMenuRef}>
          <nav className='limiter-menu-desktop container'>
            <a href='#' className='logo'>
              <img src='images/icons/logo-01.png' alt='IMG-LOGO' />
            </a>

            <div className='menu-desktop'>
              <ul className='main-menu'>
                <li className='active-menu'>
                  <a href='index.html'>Home</a>
                </li>
                <li>
                  <a href='product.html'>Shop</a>
                </li>
                <li className='label1' data-label1='hot'>
                  <a href='shoping-cart.html'>Features</a>
                </li>
                <li>
                  <a href='blog.html'>Blog</a>
                </li>
                <li>
                  <a href='about.html'>About</a>
                </li>
                <li>
                  <a href='contact.html'>Contact</a>
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
          <a href='index.html'>
            <img src='images/icons/logo-01.png' alt='IMG-LOGO' />
          </a>
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
                USD
              </a>
            </div>
          </li>
        </ul>
        <ul className='main-menu-m'>
          <li>
            <a href='index.html'>Home</a>
          </li>
          <li>
            <a href='product.html'>Shop</a>
          </li>
          <li>
            <a
              href='shoping-cart.html'
              className='label1 rs1'
              data-label1='hot'>
              Features
            </a>
          </li>
          <li>
            <a href='blog.html'>Blog</a>
          </li>
          <li>
            <a href='about.html'>About</a>
          </li>
          <li>
            <a href='contact.html'>Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
