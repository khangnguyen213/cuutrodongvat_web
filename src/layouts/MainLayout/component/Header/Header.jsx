import React from 'react';
import logo from '@assets/logo-green.png';
// import en_logo from '@assets/en.jpg';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import './Header.scss';
import { router } from '@/routes';
import { logout } from '@/services/fosters/fostersService';
import { useSelector } from 'react-redux';
import { useModalContext } from '@/contexts/modalContext';

const Header = () => {
  console.log('Render Header');
  const navigate = router.navigate;
  const user = useSelector((state) => state.session.user);
  const { openModal } = useModalContext();

  const items = [
    { label: 'Về chúng tôi', key: 'about', disabled: false },
    {
      label: 'Tìm mái ấm',
      key: 'find_home',
      children: [
        { label: 'Mái ấm', key: 'all' },
        { label: 'Chó chờ đi chủ', key: 'dogs' },
        { label: 'Mèo chờ đi chủ', key: 'cats' },
      ],
    },
    {
      label: 'Quản lý',
      key: 'manage',
      disabled: !user,
      children: [
        { label: 'Các trường hợp', key: 'cases' },
        { label: 'Đơn xin nhận nuôi', key: 'adopts' },
      ],
    },
    {
      label: 'Đăng chó mèo cần mái ấm',
      key: 'register',
      disabled: false,
    },
    {
      label: !user && 'Đăng nhập',
      icon: user && (
        <Avatar style={{ transform: 'translateY(4px)' }} src={user?.avatar} />
      ),
      key: 'account',
      disabled: false,
      children: user && [
        { label: user?.name, key: 'infor' },
        { label: 'Đăng xuất', key: 'logout' },
      ],
    },
  ];

  const itemsDesktop = items;

  const itemsMobile = [
    {
      label: 'Danh mục',
      key: 'sub1',
      icon: <MenuOutlined />,
      children: items,
    },
  ];

  const onClick = (e) => {
    switch (e.key) {
      case 'about':
        navigate('/');
        break;
      case 'all':
        navigate('/tim-mai-am');
        break;
      case 'dogs':
        navigate('/tim-mai-am/cho-cho-di-chu');
        break;
      case 'cats':
        navigate('/tim-mai-am/meo-cho-di-chu');
        break;
      case 'register':
        console.log(window.location);
        if (window.location.pathname === '/quan-ly/cac-truong-hop') {
          openModal('PET_CREATE_MODAL');
        } else {
          navigate('/dang-ky');
        }
        break;
      case 'account':
        if (!user) navigate('/dang-nhap');
        break;
      case 'cases':
        navigate('/quan-ly/cac-truong-hop');
        break;
      case 'adopts':
        navigate('/quan-ly/don-xin-nhan-nuoi');
        break;
      case 'logout':
        logout();
        navigate('/');
        break;
      default:
        break;
    }
  };
  return (
    <header>
      <img src={logo} onClick={() => navigate('/')} />
      <nav className="desktop_nav">
        <Menu
          onClick={onClick}
          style={{ width: '100%', fontFamily: 'Baloo 2' }}
          // defaultSelectedKeys={['1']}
          mode="horizontal"
          items={itemsDesktop}
          disabledOverflow
        />
      </nav>
      <nav className="mobile_nav">
        <Menu
          onClick={onClick}
          style={{ width: '100%', fontFamily: 'Baloo 2' }}
          mode="inline"
          items={itemsMobile}
        />
      </nav>
    </header>
  );
};

export default React.memo(Header);
