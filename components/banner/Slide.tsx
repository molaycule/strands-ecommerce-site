import { FC } from 'react';

export interface SlideProps {
  index: number;
  title: string;
  subtitle?: string;
}
const Slide: FC<SlideProps> = ({ index, title, subtitle }) => {
  return (
    <div className={`item-slick1 slide${index}`}>
      <div className='container h-full'>
        <div className='flex-col-l-m h-full p-t-100 p-b-30 respon5'>
          {subtitle && (
            <div className='layer-slick1'>
              <span className='ltext-101 cl2 respon2'>{subtitle}</span>
            </div>
          )}
          <div className='layer-slick1'>
            <h2 className='ltext-201 cl2 p-t-19 p-b-43 respon1'>
              {title.toUpperCase()}
            </h2>
          </div>
          <div className='layer-slick1'>
            <a
              href='product.html'
              className='flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04'>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
