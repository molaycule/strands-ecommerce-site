import Slider from 'react-slick';
import Slide, { SlideProps } from './Slide';

const BannerSlide = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const slideDetails: Array<SlideProps> = [
    { index: 1, title: 'NEW SEASON', subtitle: 'Women Collection 2021' },
    { index: 2, title: 'Jackets & Coats', subtitle: 'Men New-Season' },
    { index: 3, title: 'New arrivals', subtitle: 'Men Collection 2021' }
  ];

  return (
    <section className='section-slide'>
      <div className='wrap-slick1'>
        <Slider {...sliderSettings} className='slick1'>
          {slideDetails.map(item => (
            <Slide
              key={item.index}
              index={item.index}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerSlide;
