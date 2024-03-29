import { Global } from '@/global';
import axios from 'axios';

const baseURL = Global.API_URL + '/pets';

const getPets = async ({ page, perPage, keyword, type, fosterId }) => {
  let url = baseURL;

  url += `?`;

  if (page) {
    url += `_page=${page}`;
  }

  if (perPage) {
    url += `&_limit=${perPage}`;
  }

  if (type) {
    url += `&type=${type}`;
  }

  if (keyword) {
    url += `&name_like=${keyword}`;
  }

  if (fosterId) {
    url += `&fosterId=${fosterId}`;
  }

  let response = await axios.get(url);
  return response.data;
};

const addPet = async (pet) => {
  let response = await axios.post(baseURL, pet);
  return response.data;
};

const deletePet = async (id) => {
  let response = await axios.delete(baseURL + '/' + id);
  return response.data;
};

const updatePet = async (pet) => {
  let response = await axios.put(baseURL + '/' + pet.id, pet);
  return response.data;
};

export { getPets, addPet, deletePet, updatePet };
export default { getPets, addPet, deletePet, updatePet };
export const petsApi = {
  getPets,
  addPet,
  deletePet,
  updatePet,
  getPetById: async (id) => {
    let response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  },
};
