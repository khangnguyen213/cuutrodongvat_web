import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

console.log('adoptsSlice.js');

export const loadAdoptsInitialData = createAsyncThunk(
  'adopts/loadAdoptsInitialData',
  async () => {
    const adopts = await adoptsApi.getAdopts();
    return adopts;
  }
);

const adoptsSlice = createSlice({
  name: 'adopts',
  initialState: [],
  reducers: {
    addAdopt: (state, action) => {
      state.push(action.payload);
    },
    updateAdoptStatus: (state, action) => {
      const { id, status } = action.payload;
      const adopt = state.find((adopt) => adopt.id === id);
      adopt.status = status;
    },
  },
});

export const { addAdopt, updateAdoptStatus } = adoptsSlice.actions;

export default adoptsSlice.reducer;
