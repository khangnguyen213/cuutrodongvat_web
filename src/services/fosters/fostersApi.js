import axios from 'axios';
import utils from '@/utils';
import { generateFosterId } from '@/utils/generateId';

const baseURL = import.meta.env.VITE_API_URL + '/fosters';

const getFosters = async () => {
  let response = await axios.get(baseURL);
  return response.data;
};

const addFoster = async (foster) => {
  let response = await axios.post(baseURL, foster);
  return response.data;
};

export const fosterApi = {
  getFosters,
  addFoster,
  getFosterByEmail: async (email) => {
    let response = await axios.get(`${baseURL}?email=${email}`);
    return response.data;
  },
  login: async (email, password) => {
    try {
      let checkUserRes = await axios.get(`${baseURL}?email=${email}`);
      let user = checkUserRes?.data[0];

      if (!user)
        throw {
          message: 'Tài khoản không tồn tại',
        };
      if (password !== user.password)
        throw {
          message: 'Mật khẩu không chính xác!',
        };

      return {
        status: 200,
        data: await utils.jwt.createToken(user),
        message: 'Đăng nhập thành công!',
      };
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  },
  register: async (data) => {
    try {
      let checkUserRes = await axios.get(`${baseURL}?email=${data.email}`);
      let user = checkUserRes?.data[0];

      if (user)
        throw {
          message: 'Email đã được sử dụng!',
        };

      const newFoster = {
        id: generateFosterId(data),
        ...data,
      };

      await axios.post(baseURL, newFoster);

      return {
        status: 200,
        message: 'Đăng ký thành công!',
      };
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  },
  authen: async (token) => {
    try {
      let data = await utils.jwt.verifyToken(token);
      if (!data)
        throw {
          message: 'token invalid',
        };

      return {
        status: 200,
        data,
        message: 'Xác thực thành công!',
      };
    } catch (err) {
      return {
        status: 500,
        message: err.message,
      };
    }
  },
  getFosterById: async (id) => {
    let response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  },
};

export { getFosters, addFoster };
