import React from 'react';
import type { AppProps } from 'next/app';
import { useSession, SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { NextComponentType } from 'next';
import '../styles/globals.css';
import Script from 'next/script';

type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // add auth type
}
function Auth({ children }: any) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return (
      <div className="h-screen w-sceen flex flex-col items-center justify-center">
        <div className="spinner" />
      </div>
    );
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5XFLKG8MTF"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-5XFLKG8MTF');
        `}
      </Script>
    </SessionProvider>
  // </StoreProvider>
  );
}
