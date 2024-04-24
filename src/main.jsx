import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import 'modern-normalize/modern-normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/NodeAvengers">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer autoClose={3000} style={{ zIndex: 99999 }} />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
