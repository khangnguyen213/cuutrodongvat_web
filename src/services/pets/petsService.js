import * as petsApi from './petsApi';
import { store } from '@/redux/store';
import * as petsSlice from '@/redux/petsSlice';
import { generatePetId } from '@/utils/generateId';
import { notification } from 'antd';

console.log('petsService.js');

export const addPet = async (petData) => {
  const newPet = {
    id: generatePetId(petData),
    ...petData,
  };
  try {
    await petsApi.addPet(newPet);
    store.dispatch(petsSlice.addPet(newPet));
    notification.success({
      message: 'Thêm thông tin thành công',
    });
  } catch (error) {
    console.log('addPet error: ', error);
    notification.error({
      message: 'Thêm thông tin thất bại',
    });
  }
};

export const deletePet = async (id) => {
  try {
    await petsApi.deletePet(id);
    store.dispatch(petsSlice.deletePet({ id }));
    notification.success({
      message: 'Xóa thông tin thành công',
    });
  } catch (error) {
    console.log(error);
    notification.error({
      message: 'Xóa thông tin thất bại',
    });
  }
};

export const updatePet = async (petData) => {
  try {
    await petsApi.updatePet(petData);
    store.dispatch(petsSlice.updatePet(petData));
    notification.success({
      message: 'Cập nhật thông tin thành công',
    });
  } catch (error) {
    console.log('updatePet error: ', error);
    notification.error({
      message: 'Cập nhật thông tin thất bại',
    });
  }
};

export const toggleAdopted = async (id) => {
  try {
    const petData = store.getState().pets.find((pet) => pet.id === id);
    const updateData = {
      ...petData,
      adopted: !petData.adopted,
    };
    await petsApi.updatePet(updateData);
    store.dispatch(petsSlice.toggleAdopted(id));
    notification.success({
      message: 'Cập nhật thông tin thành công',
    });
  } catch (error) {
    console.log('toggleAdopted error: ', error);
    notification.error({
      message: 'Cập nhật thông tin thất bại',
    });
  }
};
