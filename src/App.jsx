import React from 'react';
import { LoadRoute } from './routes/index';
import { ModalContextProvider } from './contexts/modalContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  console.log('App.jsx');
  return (
    <Provider store={store}>
      <ModalContextProvider>
        <LoadRoute />
      </ModalContextProvider>
    </Provider>
  );
}
