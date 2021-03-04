import Link from 'next/link';
import { FC } from 'react';
import routes from 'routes';

interface SlideProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const Slide: FC<SlideProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div
      className={`item-slick1`}
      style={{ backgroundImage: `url(${imageUrl})` }}>
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
            <Link href={routes.products}>
              <a className='flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04'>
                Shop Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
