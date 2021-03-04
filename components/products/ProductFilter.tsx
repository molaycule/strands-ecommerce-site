import { FC, LegacyRef } from 'react';

interface ProductFilterProps {
  panelFilterRef?: LegacyRef<HTMLDivElement>;
}

const ProductFilter: FC<ProductFilterProps> = ({ panelFilterRef }) => {
  if (!panelFilterRef) return null;

  return (
    <div className='dis-none panel-filter w-full p-t-10' ref={panelFilterRef}>
      <div className='wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm'>
        <div className='filter-col1 p-r-15 p-b-27'>
          <div className='mtext-102 cl2 p-b-15'>Sort By</div>
          <ul>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                Default
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                Popularity
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                Average rating
              </a>
            </li>
            <li className='p-b-6'>
              <a
                href='#'
                className='filter-link stext-106 trans-04 filter-link-active'>
                Newness
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                Price: Low to High
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                Price: High to Low
              </a>
            </li>
          </ul>
        </div>
        <div className='filter-col2 p-r-15 p-b-27'>
          <div className='mtext-102 cl2 p-b-15'>Price</div>
          <ul>
            <li className='p-b-6'>
              <a
                href='#'
                className='filter-link stext-106 trans-04 filter-link-active'>
                All
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                ₦0.00 - ₦500.00
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                ₦500.00 - ₦1,000.00
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                ₦1,000.00 - ₦1,500.00
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                ₦1,500.00 - ₦2,000.00
              </a>
            </li>
            <li className='p-b-6'>
              <a href='#' className='filter-link stext-106 trans-04'>
                ₦2,000.00+
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
