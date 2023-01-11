import '../styles/globals.css';

import type { AppProps } from 'next/app';
// import { StoreProvider } from 'easy-peasy';
import { useSession, SessionProvider } from 'next-auth/react';

import { ToastContainer } from 'react-toastify';
// import store from './store';
import 'react-toastify/dist/ReactToastify.css';
import type { NextComponentType } from 'next';
// Import Component type
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // add auth type
}
function Auth({ children }: any) {
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
}: CustomAppProps) {
  return (
  // <StoreProvider store={store}>
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
  // </StoreProvider>
  );
}
