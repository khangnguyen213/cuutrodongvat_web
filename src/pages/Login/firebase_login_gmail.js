import { app } from '@/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { fosterApi } from '../../services/fosters/fostersApi';
import { notification } from 'antd';

export const firebase_login_gmail = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const foster = await fosterApi.getFosterByEmail(user.email);
    if (foster.length === 0) {
      await fosterApi.register({
        email: user.email,
        password: user.uid,
        name: user.displayName,
        phone:
          user.phoneNumber ||
          prompt('Bổ sung số điện thoại của bạn nếu có nhé') ||
          '',
        facebook: prompt('Bổ sung link facebook của bạn nếu có nhé') || '',
        avatar: user.photoURL,
      });
      const res = await fosterApi.login(user.email, user.uid);
      if (res.status === 200) {
        notification.success({ message: 'Đăng nhập thành công' });
        localStorage.setItem('token', res.data);
        window.location.href = '/quan-ly/cac-truong-hop';
      } else {
        notification.error({ message: res.message });
      }
    } else {
      const res = await fosterApi.login(user.email, user.uid);
      if (res.status === 200) {
        notification.success({ message: 'Đăng nhập thành công' });
        localStorage.setItem('token', res.data);
        window.location.href = '/quan-ly/cac-truong-hop';
      } else {
        notification.error({ message: res.message });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
