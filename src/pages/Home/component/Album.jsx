import React from 'react';
import cat_1 from '@assets/cat-1.png';
import cat_2 from '@assets/cat-2.png';
import cat_3 from '@assets/cat-3.png';
import { router } from '../../../routes';

const Album = () => {
  console.log('Render Album');
  const navigate = router.navigate;
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
};

export default Album;
