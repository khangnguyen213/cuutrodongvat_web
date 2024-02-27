import * as fostersApi from './fostersApi';
import { store } from '@/redux/store';
import * as fostersSlice from '@/redux/fostersSlice';
import * as sessionSlice from '@/redux/sessionSlice';
import { generateFosterId } from '@/utils/generateId';
import { notification } from 'antd';
import { Global } from '@/global';

console.log('fostersService.js');

export const addFoster = async (foster) => {
  localStorage.setItem('add_foster_error', 'false');
  const fosters = store.getState().fosters;
  if (fosters.find((f) => f.email === foster.email)) {
    localStorage.setItem('add_foster_error', 'true');
    notification.error({ message: 'Email đã tồn tại' });
    return;
  }

  const newFoster = {
    id: generateFosterId(foster),
    ...foster,
  };

  try {
    store.dispatch(fostersSlice.addFoster(newFoster));
    await fostersApi.addFoster(newFoster);
    notification.success({ message: 'Đăng ký foster thành công' });
  } catch (error) {
    console.log('addFoster error: ', error);
    localStorage.setItem('add_foster_error', 'true');
    notification.error({ message: 'Đăng ký foster thất bại' });
    loadFostersInitalData();
  }
};

export const login = async (email, password) => {
  localStorage.setItem('login_error', 'false');
  localStorage.removeItem('token');
  store.dispatch(sessionSlice.removeSession());
  const fosters = store.getState().fosters;
  const match = fosters.find(
    (foster) => foster.email === email && foster.password === password
  );
  if (match) {
    store.dispatch(sessionSlice.addSession(match));
    const token = JSON.stringify({ ...match, secret: Global.secret });
    localStorage.setItem('token', token);
    notification.success({ message: 'Đăng nhập thành công' });
  } else {
    notification.error({ message: 'Đăng nhập thất bại' });
  }
};

export const logout = async () => {
  localStorage.removeItem('token');
  store.dispatch(sessionSlice.removeSession());
  notification.success({ message: 'Đăng xuất thành công' });
};
