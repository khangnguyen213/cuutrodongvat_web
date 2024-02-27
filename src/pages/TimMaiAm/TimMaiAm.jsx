import React, { useEffect } from 'react';
// import './TimMaiAm.scss';
import PetList from '@components/PetList/PetList';
import { useSelector } from 'react-redux';
import dog_waiting from '@/assets/dog-waiting.jpg';
import cat_waiting from '@/assets/cat-waiting.jpg';

export default function TimMaiAm({ type }) {
  console.log('Render TimMaiAm');
  const pets = useSelector((state) => state.pets);
  const petListData = type ? pets.filter((pet) => pet.type === type) : pets;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tìm mái ấm';
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${type === 'cat' ? cat_waiting : dog_waiting})`,
          width: '100%',
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <h1>
            {type
              ? type === 'dog'
                ? 'Chó chờ đi chủ'
                : 'Mèo chờ đi chủ'
              : 'Tìm mái ấm'}
          </h1>
        </div>
      </div>
      <div className="tim_mai_am">
        <PetList petListData={petListData} includeFirstItem={false} />
      </div>
    </>
  );
}
