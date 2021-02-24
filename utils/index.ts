import { Dispatch, SetStateAction } from 'react';

export class Utils {
  static showCartPanelHandler = () => {
    const cartPanel = document.querySelector('.js-panel-cart');
    if (!cartPanel) return;
    cartPanel.classList.toggle('show-header-cart');
  };

  static slideUp = (target: HTMLElement, duration: number) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  static slideDown = (target: HTMLElement, duration: number) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;

    if (display === 'none') display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  };

  static slideToggle = (target: HTMLElement, duration: number) => {
    if (window.getComputedStyle(target).display === 'none') {
      return Utils.slideDown(target, duration);
    } else {
      return Utils.slideUp(target, duration);
    }
  };

  static incrementNumberOfProduct = (
    setNumberOfProduct: Dispatch<SetStateAction<number>>
  ) => {
    setNumberOfProduct((state: number) => state + 1);
  };

  static decrementNumberOfProduct = (
    setNumberOfProduct: Dispatch<SetStateAction<number>>
  ) => {
    setNumberOfProduct((state: number) => (state < 1 ? state : state - 1));
  };
}
