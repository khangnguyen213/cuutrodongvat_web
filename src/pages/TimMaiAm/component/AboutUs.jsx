import React from 'react';
import aboutUsImg from '@assets/about-us.png';

export default function AboutUs() {
  console.log('Render AboutUs');
  return (
    <div className="about_us">
      <div className="about_us_img">
        <img src={aboutUsImg} />
      </div>
      <div className="about_us_content">
        <h2>Về chúng tôi</h2>
        <h1>HỘI CỨU TRỢ ĐỘNG VẬT ĐÀ NẴNG</h1>
        <p>
          Hội Cứu Trợ Động Vật Đà Nẵng được hình thành từ 01/2013, đến nay đã
          gần một thập kỷ.
        </p>
        <p>
          Khởi đầu từ một nhóm nhỏ các bạn trẻ với tình yêu thương động vật,
          hoạt động tự phát và nhỏ lẻ. Trải qua nhiều thăng trầm, Hội Cứu Trợ
          Động Vật Đà Nẵng đã không ngừng cố gắng vươn lên, tự hoàn thiện tổ
          chức.
        </p>
        <p>
          Giờ đây chúng tôi tự hào là một trong những nhóm thiện nguyện theo
          đuổi thực hiện phúc lợi động vật hàng đầu miền Trung Việt Nam. Có thể
          nói, Hội là một tổ chức được vận hành bài bản, với hơn 100 tình nguyện
          viên chia làm nhiều nhóm với chức năng hoạt động độc lập, nghiêm túc
          và chuyên sâu.
        </p>
      </div>
    </div>
  );
}
