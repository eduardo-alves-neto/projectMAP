'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ListMovies from '@/components/list-movies';
import Loading from '@/components/loading';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MoviesType } from '@/types/movie';
import Link from 'next/link';
import { Suspense, useState } from 'react';

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/movies`);

  if (!res.ok) {
    console.error('A resposta da API não foi bem-sucedida');
    return { props: { movies: [] } };
  }

  const movies = await res.json();

  return { props: { movies } };
}

export default function HomePage({ movies }: { movies: MoviesType[] }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      <Header props={{ openMenu, setOpenMenu, openCart, setOpenCart }} />

      <div className='bg-white'>
        <div className='mx-auto max-w-2xl pt-32 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='w-full mb-4 p-1 flex justify-center items-center'>
            <Carousel className='w-full py-4'>
              <CarouselContent>
                {movies?.map((banner, index) => (
                  <CarouselItem key={index}>
                    <div className='p-2 flex justify-center items-center'>
                      <img
                        className='rounded-xl '
                        src={`https://image.tmdb.org/t/p/w400/${banner.poster_path}`}
                        alt={banner.title}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <br />

          <div className='flex justify-between items-center px-4 mb-12'>
            <span className='text-2xl font-bold font-sans tracking-wide'>Mais assistidos</span>
            <Link
              href='/moviesPage'
              className='hover:border-b hover:scale-105 border-black text-md sm:text-xl font-sans font-bold sm:font-semibold'
            >
              Ver Tudo
            </Link>
          </div>

          <ListMovies movies={movies} />
        </div>
      </div>

      <Footer />
    </Suspense>
  );
}
