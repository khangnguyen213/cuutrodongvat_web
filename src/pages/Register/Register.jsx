// million-ignore

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import donationImage from '@/assets/donation.jpg';
import { router } from '@/routes';
import { addFoster } from '@/services/fosters/fostersService';
import { imagesToFirebaseUrls } from '@/utils/imagesToFirebaseUrl';
import { useModalContext } from '@/contexts/modalContext';

import './Register.scss';
import { useSelector } from 'react-redux';

export default function Register() {
  console.log('Render Register');
  const userSession = useSelector((state) => state.session.user);
  const navigate = router.navigate;
  const { openModal } = useModalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    openModal('LOADING_MODAL');
    imagesToFirebaseUrls(data.avatar, '').then(async (urls) => {
      const foster = { ...data, avatar: urls[0] };
      console.log('imageLoaded', foster);
      await addFoster(foster);
      openModal('NONE');
      if (localStorage.getItem('add_foster_error') === 'false')
        navigate('/dang-nhap');
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Đăng ký';
    if (userSession) {
      openModal('PET_CREATE_MODAL');
      navigate('/quan-ly/cac-truong-hop');
    }
  }, []);
  return (
    <div className="register_page">
      <div className="register_page_header">
        <h1>Đăng ký chó/mèo cần được nhận nuôi</h1>
        <p>
          Bạn vui lòng đăng ký thông tin liên hệ trước khi gửi gắm các bé nhé
        </p>
      </div>
      <div className="register_page_content">
        <div className="register_page_content_left">
          <h1>Đăng ký</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Địa chỉ email"
              {...register('email', { required: true })}
              autoComplete="off"
            />
            {errors.email?.type === 'required' && (
              <span className="error-msg">
                Địa chỉ email là cần thiết để đăng ký
              </span>
            )}

            <input
              type="text"
              placeholder="Họ và tên"
              {...register('name', { required: true })}
              autoComplete="off"
            />
            {errors.name?.type === 'required' && (
              <span className="error-msg">Hãy nhập họ tên đầy đủ nhé</span>
            )}

            <input
              type="text"
              placeholder="Số điện thoại"
              {...register('phone', { required: true })}
              autoComplete="off"
            />
            {errors.phone?.type === 'required' && (
              <span className="error-msg">
                Cho chúng mình xin số điện thoại của bạn nhé
              </span>
            )}

            <input
              type="text"
              placeholder="Link Facebook"
              {...register('facebook')}
              autoComplete="off"
            />
            {errors.facebook?.type === 'required' && (
              <span className="error-msg">Hãy nhập link Facebook</span>
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
            <input
              className="input-file"
              type="file"
              {...register('avatar', { required: true })}
            />
            {errors.avatar?.type === 'required' && (
              <span className="error-msg">
                Cho chúng mình một tấm ảnh của bạn nhé
              </span>
            )}
            <button type="submit" className="btn-register">
              Đăng ký
            </button>
            <div className="change-form">
              <p>Đã có tài khoản</p>
              <span onClick={() => navigate('/dang-nhap')}>Đăng nhập</span>
            </div>
          </form>
        </div>
        <div className="register_page_content_right">
          <h1>Các kênh nhận quyên góp</h1>
          <img src={donationImage} />
        </div>
      </div>
    </div>
  );
}
