import { configureStore } from '@reduxjs/toolkit';
import petsReducer, { loadPetInitalData } from './petsSlice';
import fostersSlice, { loadFostersInitialData } from './fostersSlice';
import adoptsSlice, { loadAdoptsInitialData } from './adoptsSlice';
import sessionSlice, { addSession } from './sessionSlice';
import { Global } from '@/global';
console.log('store.js');

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    fosters: fostersSlice,
    adopts: adoptsSlice,
    session: sessionSlice,
  },
});

store.dispatch(loadPetInitalData());
store.dispatch(loadAdoptsInitialData());
store.dispatch(loadFostersInitialData());

if (localStorage.token) {
  const token = JSON.parse(localStorage.token);
  if (token.secret !== Global.secret) {
    localStorage.removeItem('token');
  } else {
    store.dispatch(addSession(token));
  }
}
