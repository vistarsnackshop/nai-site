import RootLayout from './layout';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Root } from 'postcss';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RootLayout>
          <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}
