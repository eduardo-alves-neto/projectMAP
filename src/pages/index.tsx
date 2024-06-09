'use client';

import Footer from '@/components/footer/footer';
import Header from '@/components/header';
import ListMovies from '@/components/listMovies';
import Loading from '@/components/loading';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import Banner from '@/components/banner';
import { useFetchMovies } from './hooks/useFetchMovies';

export default function HomePage() {
  const { movies, moviesInformations } = useFetchMovies();

  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Header props={{ openMenu, setOpenMenu, openCart, setOpenCart }} />

      <main>
        <Banner moviesInformations={moviesInformations} />

        <section className='mx-auto max-w-7xl pt-8 sm:px-6 lg:px-8 flex justify-between px-10'>
          <h2 className='text-2xl font-bold font-sans tracking-wide mr-4'>
            Mais assistidos
          </h2>
          <Link
            href='/moviesPage'
            className='hover:border-b hover:scale-105 border-black text-md sm:text-xl font-sans font-bold sm:font-semibold'
          >
            Ver Tudo
          </Link>
        </section>

        <ListMovies movies={movies} />
      </main>

      <Footer />
    </Suspense>
  );
}
