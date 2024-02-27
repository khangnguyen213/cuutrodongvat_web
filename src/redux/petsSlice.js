import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as petsApi from '@/services/pets/petsApi';

console.log('petsSlice.js');

export const loadPetInitalData = createAsyncThunk(
  'pets/loadPetInitalData',
  async () => {
    const pets = await petsApi.getPets();
    return pets;
  }
);

const petsSlice = createSlice({
  name: 'pets',
  initialState: [],
  reducers: {
    addPet: (state, action) => {
      state.push(action.payload);
    },

    deletePet: (state, action) => {
      return state.filter((pet) => pet.id !== action.payload.id);
    },
    updatePet: (state, action) => {
      const index = state.findIndex((pet) => pet.id == action.payload.id);
      state[index] = action.payload;
    },

    toggleAdopted: (state, action) => {
      const index = state.findIndex((pet) => pet.id == action.payload);
      state[index].adopted = !state[index].adopted;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPetInitalData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addPet, deletePet, updatePet, toggleAdopted } =
  petsSlice.actions;

export default petsSlice.reducer;
