import { BrowserRouter } from 'react-router';
import RouterProvider from './router/RouterProvider';
import { store } from './store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <RouterProvider />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
