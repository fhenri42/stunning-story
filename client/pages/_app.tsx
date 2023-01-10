import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import { useSession, SessionProvider } from 'next-auth/react';

import { ToastContainer } from 'react-toastify';
import store from './store';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <StoreProvider store={store}>
      <SessionProvider session={session}>
        <ToastContainer autoClose={2000} />

        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </StoreProvider>
  );
}
