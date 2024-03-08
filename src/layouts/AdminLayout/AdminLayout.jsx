import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
  const sessionStore = useSelector((state) => state.session);
  useEffect(() => {
    if (!sessionStore.data && !sessionStore.loading) {
      localStorage.removeItem('token');
      window.location.href = '/dang-nhap';
    }
  }, [sessionStore.data, sessionStore.loading]);
  return (
    <>
      <Outlet />
    </>
  );
}
