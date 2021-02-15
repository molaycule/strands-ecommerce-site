import Category, { CategoryProps } from './Category';

const TopCategories = () => {
  const categories: Array<CategoryProps> = [
    {
      title: 'Women',
      subtitle: 'Spring 2018',
      imageUrl: 'images/banner-01.jpg'
    },
    {
      title: 'Men',
      subtitle: 'Spring 2018',
      imageUrl: 'images/banner-02.jpg'
    },
    {
      title: 'Accessories',
      subtitle: 'New Trend',
      imageUrl: 'images/banner-03.jpg'
    }
  ];

  return (
    <div className='sec-banner bg0 p-t-80 p-b-50'>
      <div className='container'>
        <div className='row'>
          {categories.map((category, index) => (
            <Category
              key={index}
              title={category.title}
              subtitle={category.subtitle}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
