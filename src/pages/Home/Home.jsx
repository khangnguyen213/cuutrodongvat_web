import React, { useEffect, useState } from 'react';
import './home.scss';
import HomeCarousel from './component/HomeCarousel';
import AboutUs from './component/AboutUs';
import Album from './component/Album';
import PetList from '@components/PetList/PetList';
import { getPets } from '../../services/pets/petsApi';

export default function Home() {
  console.log('Render Home');
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'HỘI CỨU TRỢ ĐỘNG VẬT';
    const fetchData = async () => {
      const data = await getPets({ page: 1, perPage: 9 });
      setPetsData(data);
    };
    fetchData();
  }, []);
  return (
    <div className="home_page">
      <HomeCarousel />
      <AboutUs />
      <Album />
      <PetList petListData={petsData} includeFirstItem={true} />
    </div>
  );
}
