import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
  },
  reducers: {
    addSession: (state, action) => {
      state.user = action.payload;
    },
    removeSession: (state) => {
      state.user = null;
    },
  },
});

export const { addSession, removeSession } = sessionSlice.actions;
export default sessionSlice.reducer;
