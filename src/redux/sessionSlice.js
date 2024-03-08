import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fosterApi } from '../services/fosters/fostersApi';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    addSession: (state, action) => {
      state.user = action.payload;
    },
    removeSession: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

const fetchUserData = createAsyncThunk('session/fetchData', async () => {
  let { data } = await fosterApi.authen(
    localStorage.getItem('token') || 'null'
  );
  // await new Promise((ok) => {
  //     console.log("đang xử lý")
  //     setTimeout(() => {
  //         ok(true)
  //     }, 5000)
  // })
  return data;
});

export const sessionActions = {
  ...sessionSlice.actions,
  fetchUserData,
};
export default sessionSlice.reducer;
