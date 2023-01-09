import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <StoreProvider store={store}>
      <SessionProvider session={session}>
        <ToastContainer autoClose={2000} />

        <Component {...pageProps} />
      </SessionProvider>
    </StoreProvider>
  );
}
