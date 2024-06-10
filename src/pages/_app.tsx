import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/transictions/transictions';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className='overflow-x-hidden max-w-[100vw]'>
      <div className={inter.className}>
        <Head>
          <link rel='icon' href='/favicon.png' />
          <title> TMDB FILMES</title>
        </Head>
        <AnimatePresence mode='wait'>
          <Layout key={router.route}>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
        <Toaster />
      </div>
    </div>
  );
}
