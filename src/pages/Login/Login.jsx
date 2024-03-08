import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import donationImage from '@/assets/donation.jpg';
import { router } from '@/routes';
import { fosterApi } from '../../services/fosters/fostersApi';
import { firebase_login_gmail } from './firebase_login_gmail';
import { BiLogoGmail } from 'react-icons/bi';
import { Button, notification } from 'antd';

import './Login.scss';
import { useSelector } from 'react-redux';

export default function Login() {
  console.log('Render Login');
  const navigate = router.navigate;
  const userSession = useSelector((state) => state.session.user);
  if (userSession) navigate('/quan-ly/cac-truong-hop');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fosterApi.login(data.email, data.password);
    if (res.status === 200) {
      notification.success({ message: 'Đăng nhập thành công' });
      localStorage.setItem('token', res.data);
      window.location.href = '/quan-ly/cac-truong-hop';
    } else {
      notification.error({ message: res.message });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Đăng nhập';
    if (userSession) {
      openModal('PET_CREATE_MODAL');
      navigate('/quan-ly/cac-truong-hop');
    }
  }, []);
  return (
    <div className="login_page">
      <div className="login_page_header">
        <h1>Đăng ký chó/mèo cần được nhận nuôi</h1>
        <p>
          Bạn vui lòng đăng ký thông tin liên hệ trước khi gửi gắm các bé nhé
        </p>
      </div>
      <div className="login_page_content">
        <div className="login_page_content_left">
          <h1>Đăng nhập</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Địa chỉ email"
              {...register('email', { required: true })}
              autoComplete="off"
            />
            {errors.email?.type === 'required' && (
              <span className="error-msg">Hãy nhập mật khẩu</span>
            )}

            <input
              type="password"
              placeholder="Mật khẩu"
              {...register('password', { required: true })}
              autoComplete="off"
            />
            {errors.password?.type === 'required' && (
              <span className="error-msg">Hãy nhập mật khẩu</span>
            )}
            <button type="submit" className="btn-login">
              Đăng nhập
            </button>
            <div className="login-form__or">
              <span>Hoặc</span>
            </div>

            <Button
              icon={<BiLogoGmail size={22} style={{ marginBottom: '4px' }} />}
              type="default"
              danger
              onClick={() => firebase_login_gmail()}
            >
              Đăng nhập bằng Gmail
            </Button>
            <div className="change-form">
              <p>Chưa có tài khoản</p>
              <span onClick={() => navigate('/dang-ky')}>Đăng ký</span>
            </div>
          </form>
        </div>
        <div className="login_page_content_right">
          <h1>Các kênh nhận quyên góp</h1>
          <img src={donationImage} />
        </div>
      </div>
    </div>
  );
}
