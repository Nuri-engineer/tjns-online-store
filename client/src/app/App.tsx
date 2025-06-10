import React from 'react';
import { BrowserRouter } from 'react-router';
import RouterProvider from './router/RouterProvider';
import { Provider } from 'react-redux';
import { store } from '../store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterProvider />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
