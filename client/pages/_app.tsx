import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import 'beautiful-react-diagrams/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
