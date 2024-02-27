import React from 'react';
import { Outlet } from 'react-router-dom';
import { router } from '../../routes';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  //check if valid token, allow, else navigate login
  const user = useSelector((state) => state.session.user);
  const navigate = router.navigate;
  if (!user) navigate('/dang-nhap');
  return (
    <>
      <Outlet />
    </>
  );
}
