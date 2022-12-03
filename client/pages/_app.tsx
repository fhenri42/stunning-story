import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import 'beautiful-react-diagrams/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ToastContainer autoClose={2000} />

      <Component {...pageProps} />
    </StoreProvider>
  );
}
