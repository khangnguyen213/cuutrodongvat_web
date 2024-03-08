import { configureStore } from '@reduxjs/toolkit';
import sessionSlice, { sessionActions } from './sessionSlice';
console.log('store.js');

export const store = configureStore({
  reducer: {
    session: sessionSlice,
  },
});

store.dispatch(sessionActions.fetchUserData());
