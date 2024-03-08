import React, { useEffect, useRef, useState } from 'react';
import './TimMaiAm.scss';
import PetList from '@components/PetList/PetList';
import dog_waiting from '@/assets/dog-waiting.jpg';
import cat_waiting from '@/assets/cat-waiting.jpg';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { getPets } from '../../services/pets/petsApi';
import { Pagination } from 'antd';

function toNonAccentVietnamese(str) {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, 'A');
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, 'E');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, 'O');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, 'U');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str.toLowerCase();
}

export default function TimMaiAm({ type }) {
  console.log('Render TimMaiAm');
  let initalPage = 1;
  let initalPerPage = 4;
  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get('page');
  let perPage = searchParams.get('perPage');
  let keyword = searchParams.get('keyword');
  const [totalPets, setTotalPets] = useState(0);

  const searchRef = useRef();
  const [petsData, setPetsData] = useState([]);

  const searchClick = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      let search = searchRef.current.value;
      let newParams = new URLSearchParams(prev);
      newParams.set('keyword', search);
      newParams.set('page', 1);
      return newParams;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPets({
        page: page || initalPage,
        perPage: perPage || initalPerPage,
        keyword: keyword,
        type: type,
      });
      setPetsData(data);
    };
    const fetchTotalPets = async () => {
      const data = await getPets({
        page: 1,
        keyword: keyword,
        type: type,
      });
      setTotalPets(data.length);
    };

    fetchData();
    fetchTotalPets();

    window.scrollTo(0, 0);
  }, [page, perPage, keyword, type]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tìm mái ấm';
  }, []);

  // useEffect(() => {
  //   setSearch('');
  // }, [type]);

  return (
    <>
      <div
        className="tim_mai_am"
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
            flexDirection: 'column',
            gap: '4px',
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
          <div className="searchBox">
            <form onSubmit={searchClick}>
              <input
                id="searchInput"
                type="text"
                placeholder="Tìm kiếm"
                ref={searchRef}
              />
            </form>
            <FaSearch onClick={searchClick} className="search-icon" />
          </div>
        </div>
      </div>
      <div className="tim_mai_am">
        <PetList petListData={petsData} includeFirstItem={false} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Pagination
          current={parseInt(page) || initalPage}
          total={totalPets}
          showSizeChanger
          pageSize={parseInt(perPage) || initalPerPage}
          pageSizeOptions={['4', '10', '20']}
          onChange={(page, pageSize) => {
            setSearchParams((prev) => {
              let newParams = new URLSearchParams(prev);
              newParams.set('page', page);
              newParams.set('perPage', pageSize);
              return newParams;
            });
          }}
        />
      </div>
    </>
  );
}
