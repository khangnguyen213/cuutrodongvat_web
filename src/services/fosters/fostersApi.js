import { Global } from '@/global';
import axios from 'axios';

const baseURL = Global.API_URL + '/fosters';

const getFosters = async () => {
  let response = await axios.get(baseURL);
  return response.data;
};

const addFoster = async (foster) => {
  let response = await axios.post(baseURL, foster);
  return response.data;
};

export { getFosters, addFoster };
