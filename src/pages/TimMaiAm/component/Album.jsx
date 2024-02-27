import React from 'react';
import cat_1 from '@assets/cat-1.png';
import cat_2 from '@assets/cat-2.png';
import cat_3 from '@assets/cat-3.png';
import { useNavigate } from 'react-router-dom';

export default function Album() {
  const navigate = useNavigate();
  return (
    <div className="album">
      <div className="album_item" onClick={() => navigate('/tim-mai-am')}>
        <img src={cat_1} />
        <h1>ỦNG HỘ - GÂY QUỸ</h1>
      </div>
      <div className="album_item" onClick={() => navigate('/tim-mai-am')}>
        <img src={cat_2} />
        <h1>TÌM CHỦ - NHẬN NUÔI</h1>
      </div>
      <div className="album_item" onClick={() => navigate('/tim-mai-am')}>
        <img src={cat_3} />
        <h1>CÁC CASE CỨU HỘ</h1>
      </div>
    </div>
  );
}
