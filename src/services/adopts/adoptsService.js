import * as adoptsApi from './adoptsApi';
import { store } from '@/redux/store';
import * as adoptsSlice from '@/redux/adoptsSlice';
import { generateAdoptId } from '@/utils/generateId';
import { notification } from 'antd';
import { toggleAdopted } from '../pets/petsService';

console.log('adoptsService.js');

export const addAdopt = async (adopt) => {
  try {
    const newAdopt = {
      ...adopt,
      status: '0',
      id: generateAdoptId(),
    };
    await adoptsApi.addAdopt(newAdopt);
    store.dispatch(adoptsSlice.addAdopt(newAdopt));
    notification.success({ message: 'Gửi yêu cầu thành công' });
  } catch (error) {
    console.log('addAdopt error: ', error);
    notification.error({ message: 'Gửi yêu cầu thất bại' });
  }
};

export const updateAdoptStatus = async (adoptId, status) => {
  try {
    // status: 0 - Chờ xác nhận, 1 - Chấp thuận, 2 - Từ chối
    if (!['0', '1', '2'].includes(status)) {
      throw new Error('Invalid status');
    }
    const adopt = store.getState().adopts.find((adopt) => adopt.id === adoptId);
    const pet = store.getState().pets.find((pet) => pet.id === adopt.petId);

    if (!adopt || !pet) {
      notification.error({ message: 'Lỗi' });
      return;
    }

    if (status === '1') {
      if (pet.adopted) {
        notification.error({ message: 'Bé đã có người nhận nuôi' });
        return;
      }
      await toggleAdopted(adopt.petId);
    }

    if (status === '2' || status === '0') {
      if (adopt.status === '1') {
        await toggleAdopted(adopt.petId);
      }
    }
    await adoptsApi.updateAdopt({ ...adopt, status: status });
    store.dispatch(
      adoptsSlice.updateAdoptStatus({ id: adoptId, status: status })
    );
    notification.success({ message: 'Thay đổi trạng thái thành công' });
  } catch (error) {
    console.log('updateAdoptStatus error: ', error);
    notification.error({ message: 'Thay đổi trạng thái thất bại' });
  }
};
