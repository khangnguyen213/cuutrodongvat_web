import React from 'react';
import paw from '@assets/paw-white.png';
import { TbGenderBigender } from 'react-icons/tb';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { GiLoveInjection } from 'react-icons/gi';
import { router } from '@/routes';
import './PetList.scss';

export default function PetList({ petListData, includeFirstItem }) {
  console.log('Render PetList');
  const navigate = router.navigate;

  const renderPetList = (data) => {
    return data.map((pet) => {
      return (
        <div
          key={pet.id}
          className="pet_list_item"
          onClick={() =>
            navigate(
              `/tim-mai-am/thong-tin/${pet.name.replace(' ', '&')}&i.${pet.id}`
            )
          }
        >
          {pet.adopted && <span>Adopted</span>}
          <img src={pet.image} />
          <div>
            <h1>{pet.name}</h1>
            <h2>{pet.species}</h2>
            <hr width="100%" color="#d7d7d7" size="1px" />
            <p>
              <TbGenderBigender strokeWidth="2" /> Giới tính:{' '}
              {pet.gender === 0 ? 'Đực' : 'Cái'}
            </p>
            <p>
              <LiaBirthdayCakeSolid strokeWidth="2" />
              Độ tuổi: {pet.age}
            </p>
            <p>
              <GiLoveInjection strokeWidth="2" />
              Triệt sản: {pet.sterilization ? 'Rồi' : 'Chưa'}
            </p>
            {!pet.adopted && (
              <h3>
                Ba mẹ ơi, con đã chờ:{' '}
                {Math.floor(
                  (Date.parse(new Date()) - Date.parse(new Date(pet.date))) /
                    86400000
                )}{' '}
                ngày
              </h3>
            )}
            {pet.adopted && <h3>Con đã được về nhà mới rồi nè!</h3>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="pet_list_container">
      <div className="pet_list">
        {includeFirstItem && (
          <div className="pet_list_item_first">
            <div>
              <h2>Thú cưng</h2>
              <h1>Tìm mái ấm</h1>
              <button onClick={() => navigate('/tim-mai-am')}>
                <p>Xem thêm</p> <img src={paw} />
              </button>
            </div>
          </div>
        )}

        {renderPetList(petListData)}
      </div>
    </div>
  );
}
