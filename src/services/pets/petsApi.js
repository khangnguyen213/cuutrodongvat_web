import { Global } from '@/global';
import axios from 'axios';

const baseURL = Global.API_URL + '/pets';

const getPets = async () => {
  let response = await axios.get(baseURL);
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
