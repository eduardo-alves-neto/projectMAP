'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ListMovies from '@/components/listMovies';
import Loading from '@/components/loading';
import { MoviesType } from '@/types/movie';
import { MovieInformation } from '@/types/moviesInformations';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import Banner from '@/components/banner';

export async function getServerSideProps() {
  const resMovies = await fetch(`http://localhost:3000/api/movies`);
  const resMoviesInformations = await fetch(
    `http://localhost:3000/api/moviesInformations`
  );

  if (!resMovies.ok || !resMoviesInformations.ok) {
    console.error('response from API was not successful');
    return { props: { movies: [], moviesInformations: [] } };
  }

  const movies = await resMovies.json();
  const moviesInformations = await resMoviesInformations.json();

  return { props: { movies, moviesInformations } };
}

export default function HomePage({
  movies,
  moviesInformations,
}: {
  movies: MoviesType[];
  moviesInformations: MovieInformation[];
}) {
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
