import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="overflow-x-hidden max-w-[100vw]">
      <div className={inter.className}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <title> TMDB FILMES</title>
        </Head>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </div>
  );
}
