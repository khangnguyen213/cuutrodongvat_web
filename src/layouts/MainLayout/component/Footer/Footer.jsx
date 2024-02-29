import React from 'react';
import logo from '@assets/logo.png';
import {
  FacebookOutlined,
  InstagramOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import './Footer.scss';

const Footer = () => {
  console.log('Render Footer');
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_item footer_item_left">
          <img src={logo} />
          <FacebookOutlined key="facebook" className="logo" />
          <InstagramOutlined key="instagram" className="logo" />
          <TikTokOutlined key="tiktok" className="logo" />
        </div>
        <div className="footer_item footer_item_right">
          <h2>Cứu Trợ Động Vật Đà Nẵng</h2>
          <ul>
            <li>Không có hotline, mọi vấn đề vui lòng inbox</li>
            <li>
              Không có nhà chung, hoạt động theo hệ thống TNV Foster tại nhà
            </li>
            <li>
              Nhận nuôi chó mèo của Hội, vui lòng trả lời câu hỏi phỏng vấn,
              đồng ý điều kiện nuôi kín & triệt sản
            </li>
          </ul>
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15337.67084149786!2d108.22470869888062!3d16.04379953311636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142170596069b11%3A0xe76fc081cb35e5cd!2sPAWS%20International%20Clinic%20Da%20Nang!5e0!3m2!1svi!2s!4v1709176865506!5m2!1svi!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          width="100%"
          height="100%"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <h3>Copyright @2023 Cứu trợ động vật Đà Nẵng</h3>
    </footer>
  );
};

export default React.memo(Footer);
