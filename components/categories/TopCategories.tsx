import { useQuery } from '@apollo/client';
import { TOP_CATEGORIES } from 'graphql/queries';
import Category from './Category';
import { AllTopCategories } from 'types';
import { Fragment } from 'react';

const TopCategories = () => {
  const { data } = useQuery<AllTopCategories>(TOP_CATEGORIES);

  return (
    <div className='sec-banner bg0 p-t-80 p-b-50'>
      <div className='container'>
        <div className='row'>
          {data?.allTopCategories.map(item => (
            <Fragment key={item.id}>
              <Category
                title={item.category1.name}
                imageUrl={item.category1Image.publicUrl}
              />
              <Category
                title={item.category2.name}
                imageUrl={item.category2Image.publicUrl}
              />
              <Category
                title={item.category3.name}
                imageUrl={item.category3Image.publicUrl}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
