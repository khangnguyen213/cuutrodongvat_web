import React from 'react';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import './mainLayout.scss';
import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { useModalContext } from '@/contexts/modalContext';

export default function MainLayout() {
  const { status } = useModalContext();
  return (
    <div className="main_layout">
      <Header></Header>
      <div className="main_layout_body">
        {status === 'IN_PROGRESS' && <Spin spinning={true} fullscreen />}
        <Outlet></Outlet>
      </div>
      <div
        class="fb-comments"
        data-href="https://cuutrodongvat-web.vercel.app"
        data-width=""
        data-numposts="5"
      ></div>
      <Footer></Footer>
    </div>
  );
}
