import React, { useEffect } from 'react';
import './home.scss';
import HomeCarousel from './component/HomeCarousel';
import AboutUs from './component/AboutUs';
import Album from './component/Album';
import PetList from '@components/PetList/PetList';
import { useSelector } from 'react-redux';

export default function Home() {
  console.log('Render Home');
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'HỘI CỨU TRỢ ĐỘNG VẬT';
  }, []);
  return (
    <div className="home_page">
      <HomeCarousel />
      <AboutUs />
      <Album />
      <PetList petListData={pets} includeFirstItem={true} />
    </div>
  );
}
