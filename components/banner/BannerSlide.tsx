import { useQuery } from '@apollo/client';
import { BANNER_ADS } from 'graphql/queries';
import Slider from 'react-slick';
import { AllBannerAds } from 'types';
import Slide from './Slide';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  pauseOnFocus: false,
  pauseOnHover: false,
  slidesToShow: 1,
  slidesToScroll: 1
};

const BannerSlide = () => {
  const { data } = useQuery<AllBannerAds>(BANNER_ADS);

  return (
    <section className='section-slide'>
      <div className='wrap-slick1'>
        <Slider {...sliderSettings} className='slick1'>
          {data?.allBannerAds.map(item => (
            <Slide
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.image.publicUrl}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerSlide;
