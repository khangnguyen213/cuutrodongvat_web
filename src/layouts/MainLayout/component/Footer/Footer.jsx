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
      <h3>Copyright @2023 Cứu trợ động vật Đà Nẵng</h3>
    </footer>
  );
};

export default React.memo(Footer);
