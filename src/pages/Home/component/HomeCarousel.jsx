import React from 'react';
import { Carousel } from 'antd';
import carousel_1 from '@assets/carousel-1.jpg';
import carousel_2 from '@assets/carousel-2.jpg';
import carousel_3 from '@assets/carousel-3.jpg';

export default function HomeCarousel() {
  console.log('Render HomeCarousel');
  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  return (
    <div style={{ width: '100%' }}>
      <Carousel afterChange={onChange} autoplay autoplaySpeed={2500} fade>
        <div className="carousel_item">
          <img src={carousel_1} />
        </div>
        <div className="carousel_item">
          <img src={carousel_2} />
        </div>
        <div className="carousel_item">
          <img src={carousel_3} />
        </div>
      </Carousel>
    </div>
  );
}
