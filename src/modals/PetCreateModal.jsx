import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sleep } from '@/utils/sleep';
import useArray from '@/hooks/useArray';
import { Space, Alert, Button, notification } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { generatePetId } from '@/utils/generateId';

import './PetCreateModal.scss';

import { useModalContext } from '@/contexts/modalContext';

import BoxModal from '@/components/BoxModal';
import { imagesToFirebaseUrls } from '@/utils/imagesToFirebaseUrl';

import petsApi from '../services/pets/petsApi';
import { useSelector } from 'react-redux';

const PetModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 200;
  const sessionStore = useSelector((state) => state.session);

  const { array: questions, push, filter } = useArray([]);

  const foster = sessionStore.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 'dog',
      gender: 0,
    },
  });

  const addPet = async (petData) => {
    const newPet = {
      id: generatePetId(petData),
      ...petData,
    };
    try {
      await petsApi.addPet(newPet);
      notification.success({
        message: 'Thêm thông tin thành công',
      });
      return newPet;
    } catch (error) {
      console.log('addPet error: ', error);
      notification.error({
        message: 'Thêm thông tin thất bại',
      });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    imagesToFirebaseUrls(data.image, '')
      .then(async (urls) => {
        const pet = {
          ...data,
          date: new Date().toDateString(),
          adopted: false,
          gender: +data.gender,
          fosterId: foster.id,
          image: urls[0],
          questions,
        };
        const res = await addPet(pet);
        setIsLoading(false);
        payload.setPetsData((prev) => [res, ...prev]);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        closeModal();
      });
  };

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove('animation-open-modal');
    sleep(DURATION).then(() => closeModal());
  };

  useEffect(() => {
    sleep(1000).then(() => {
      modal_ref.current.classList?.add('animation-open-modal');
    });
  }, []);

  return (
    <BoxModal className="modal_backdrop">
      <div ref={modal_ref} className="form_pet">
        <h1>Thêm mới</h1>
        <button onClick={handleCloseModal} className="btn-close"></button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Tên bé"
              {...register('name', { required: true })}
              autoComplete="off"
              className="form-row-item"
            />
            {errors.name?.type === 'required' && (
              <span className="error-msg">
                Điền tên bé vào nhé, không được để trống đâu
              </span>
            )}

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '10px',
              }}
            >
              <div className="form-row-item">
                <select {...register('type', { required: true })}>
                  <option value="dog">Chó</option>
                  <option value="cat">Mèo</option>
                </select>
                {errors.type?.type === 'required' && (
                  <span className="error-msg">
                    Hãy cho mình biết bé là chó hay mèo nhé
                  </span>
                )}
              </div>
              <div className="form-row-item">
                <select {...register('gender')}>
                  <option value={0}>Đực</option>
                  <option value={1}>Cái</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Giống"
              {...register('species')}
              autoComplete="off"
              className="form-row-item"
            />
            <input
              type="text"
              placeholder="Màu"
              {...register('color')}
              autoComplete="off"
              className="form-row-item"
            />
            <input
              type="text"
              placeholder="Tuổi"
              {...register('age')}
              autoComplete="off"
              className="form-row-item"
            />
          </div>

          <div className="form-row" style={{ flexDirection: 'row' }}>
            <div className="input-group form-row-item">
              <input
                {...register('vacine')}
                type="checkbox"
                id="vacine"
                name="vacine"
              />
              <label htmlFor="vacine">Đã tiêm ngừa</label>
            </div>
            <div className="input-group form-row-item">
              <input
                {...register('ferilization')}
                type="checkbox"
                id="ferilization"
                name="ferilization"
              />
              <label htmlFor="ferilization">Đã triệt sản</label>
            </div>
          </div>

          <textarea placeholder="Mô tả" {...register('description')} />
          <div className="input-group">
            <label htmlFor="image">Hình ảnh</label>
            <input
              type="file"
              placeholder="Hình ảnh"
              {...register('image')}
              autoComplete="off"
              id="image"
            />
          </div>
          <div className="input-group">
            <Space
              direction="vertical"
              style={{
                width: '100%',
              }}
            >
              <Alert
                showIcon
                message="Câu hỏi cho người muốn nhận nuôi bé"
                type="warning"
                action={
                  <PlusOutlined
                    size={24}
                    onClick={() => {
                      const question = prompt('Nhập câu hỏi');
                      if (question) {
                        push({
                          id: `q${Math.floor(Date.now() * 10000)}`,
                          question,
                        });
                      }
                    }}
                  />
                }
              />
              {questions.map((item) => (
                <Alert
                  type="success"
                  key={item.id}
                  message={item.question}
                  action={
                    <CloseOutlined
                      size={24}
                      onClick={() => filter((i) => i.id !== item.id)}
                    />
                  }
                />
              ))}
            </Space>
          </div>
          <button
            style={{ border: 'none', width: '100%', margin: '10px 0' }}
            type="submit"
          >
            <Button type="submit" className="btn-register" loading={isLoading}>
              Đăng ký
            </Button>
          </button>
        </form>
      </div>
    </BoxModal>
  );
};

export default PetModal;
