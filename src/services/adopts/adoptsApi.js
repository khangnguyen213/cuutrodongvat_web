import { Global } from '@/global';
import axios from 'axios';

const baseURL = Global.API_URL + '/adopts';

const getAdopts = async () => {
  let response = await axios.get(baseURL);
  return response.data;
};

const addAdopt = async (adopt) => {
  let response = await axios.post(baseURL, adopt);
  return response.data;
};

const updateAdopt = async (adopt) => {
  let response = await axios.put(`${baseURL}/${adopt.id}`, adopt);
  return response.data;
};

export const adoptsApi = {
  getAdopts,
  addAdopt,
  updateAdopt,
  getAdoptById: async (id) => {
    let response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  },
};

export { getAdopts, addAdopt, updateAdopt };
