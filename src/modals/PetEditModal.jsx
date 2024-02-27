import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { sleep } from '@/utils/sleep';

import './PetEditModal.scss';

import { useModalContext } from '@/contexts/modalContext';

import BoxModal from '@/components/BoxModal';
import { imagesToFirebaseUrls } from '@/utils/imagesToFirebaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from '@/services/pets/petsService';
import { router } from '@/routes';

import useArray from '@/hooks/useArray';
import { Space, Alert } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const PetModal = () => {
  //   const { openModal, payload, setStatus } = useModalContext();
  const { openModal, closeModal, setStatus, payload } = useModalContext();
  const pet = useSelector((state) =>
    state.pets.find((pet) => pet.id == payload.update_pet_id)
  );
  const dispatch = useDispatch();
  const navigate = router.navigate;
  const modal_ref = useRef(null);
  const DURATION = 200;
  //   const [loading, setLoading] = useState(STATUS.NOT_START);
  //   const [payload, setPayload] = useState({});

  const {
    array: questions,
    push,
    filter,
    update,
    remove,
  } = useArray(pet.questions);

  let foster;
  if (localStorage.getItem('token')) {
    foster = JSON.parse(localStorage.getItem('token'));
  } else {
    navigate('/');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: pet.name,
      type: pet.type,
      species: pet.species,
      color: pet.color,
      gender: pet.gender,
      age: pet.age,
      vacine: pet.vacine,
      ferilization: pet.ferilization,
      description: pet.description,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    setStatus('IN_PROGRESS');
    let updateData;

    updateData = {
      ...pet,
      ...data,
      image: pet.image,
      questions,
    };

    if (data.image.length > 0) {
      imagesToFirebaseUrls(data.image, '').then((urls) => {
        console.log(urls);
        updateData = { ...updateData, image: urls[0] };
        console.log(updateData);
        updatePet(updateData);
        if (localStorage.getItem('update_pet_error') === 'true') {
          setStatus('FAIL');
          closeModal();
        }
        if (localStorage.getItem('update_pet_error') === 'false') {
          setStatus('SUCCESS');
          closeModal();
        }
      });
    } else {
      updatePet(updateData);
      if (localStorage.getItem('update_pet_error') === 'true') {
        setStatus('FAIL');
        closeModal();
      }
      if (localStorage.getItem('update_pet_error') === 'false') {
        setStatus('SUCCESS');
        closeModal();
      }
    }
    //add foster fail will be signal by local storage 'add_foster_error' = 'true'
    //else local storage 'add_foster_error' = 'false'
  };

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove('animation-open-modal');
    sleep(DURATION).then(() => openModal('NONE'));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add('animation-open-modal');
    });
  }, []);

  //   useEffect(() => {
  //     if (loading === STATUS.SUCCESS) {
  //       handleCloseModal();
  //     }
  //   }, [loading]);

  return (
    <BoxModal className="modal_backdrop">
      <div ref={modal_ref} className="form_pet">
        <h1>Cập nhật</h1>
        <button onClick={handleCloseModal} className="btn-close"></button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <input
              type="text"
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
              {...register('species')}
              autoComplete="off"
              className="form-row-item"
              placeholder="Giống"
            />
            <input
              type="text"
              {...register('color')}
              autoComplete="off"
              className="form-row-item"
              placeholder="Màu"
            />
            <input
              type="text"
              {...register('age')}
              autoComplete="off"
              className="form-row-item"
              placeholder="Tuổi"
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

          <textarea {...register('description')} placeholder="Mô tả" />
          <div className="input-group">
            {pet.image && (
              <img
                src={pet.image}
                alt="pet"
                style={{ width: '100px', height: '100px' }}
              />
            )}
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
          <button type="submit" className="btn-register">
            Cập nhật
          </button>
        </form>
      </div>
    </BoxModal>
  );
};

export default PetModal;
