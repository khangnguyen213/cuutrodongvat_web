import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as fostersApi from '@/services/fosters/fostersApi';

console.log('fostersSlice.js');

export const loadFostersInitialData = createAsyncThunk(
  'fosters/loadFostersInitialDate',
  async () => {
    const fosters = await fostersApi.getFosters();
    return fosters;
  }
);

const fostersSlice = createSlice({
  name: 'fosters',
  initialState: [],
  reducers: {
    addFoster: (state, action) => {
      state.push(action.payload);
    },

    deleteFoster: (state, action) => {
      console.log('deleteFoster');
      return state.filter((foster) => foster.id !== action.payload);
    },

    updateFoster: (state, action) => {
      console.log('updateFoster');
      const index = state.findIndex(
        (foster) => foster.id === action.payload.id
      );
      state[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFostersInitialData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addFoster, deleteFoster, updateFoster } = fostersSlice.actions;

export default fostersSlice.reducer;
