import { FC } from 'react';

export interface CategoryProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const Category: FC<CategoryProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className='col-md-6 col-xl-4 p-b-30 m-lr-auto'>
      <div className='block1 wrap-pic-w'>
        <img src={imageUrl} alt='IMG-BANNER' />
        <a
          href='product.html'
          className='block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3'>
          <div className='block1-txt-child1 flex-col-l'>
            <span className='block1-name ltext-102 trans-04 p-b-8'>
              {title}
            </span>
            <span className='block1-info stext-102 trans-04'>{subtitle}</span>
          </div>
          <div className='block1-txt-child2 p-b-4 trans-05'>
            <div className='block1-link stext-101 cl0 trans-09'>Shop Now</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Category;
