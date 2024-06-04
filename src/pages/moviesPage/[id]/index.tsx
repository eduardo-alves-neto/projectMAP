'use client';

import { FormEvent, useEffect, useState } from 'react';
import Header from '@/components/header';
import { useCartStore } from '@/store/cart-store';
import { MoviesType } from '@/types/movie';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3000/api/movies`);

  if (!res.ok) {
    console.error('A resposta da API não foi bem-sucedida');
    return { props: { movies: [] } };
  }

  const movies = await res.json();

  return { props: { movies, params: context.params } };
}

export default function MoviesDetailsPage({
  params,
  movies,
}: {
  params: { id: string };
  movies: MoviesType[];
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [movie, setmovie] = useState<MoviesType>({} as MoviesType);

  const { addToCart, cart } = useCartStore();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const isAlreadyInCart = cart.some((item) => item.id === movie.id);

    if (!isAlreadyInCart) {
      addToCart({
        id: movie.id,
        title: movie.title,
        price: movie.price ?? 100,
        amount: 1,
        href: movie.href ?? '',
        poster_path: movie.poster_path ?? '',
        overview: movie.overview,
      });
    }
  }

  useEffect(() => {
    movies.forEach((item: MoviesType) => {
      item.id == Number(params.id) && setmovie(item);
    });
  }, []);

  return (
    <>
      <Header props={{ openCart, openMenu, setOpenCart, setOpenMenu }} />

      <main className='bg-white pt-36'>
        <div>
          <div className='mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
            <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` ?? ''}
                alt={movie.title}
                className='h-full w-full object-cover object-center'
              />
            </div>
          </div>

          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {movie.title}
              </h1>
            </div>

            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>movie information</h2>
              <p className='text-xl tracking-tight text-gray-900'>R$ {movie.price ?? 100}</p>

              <form onSubmit={handleSubmit} className='mt-4'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-lg border border-transparent bg-SteelBlue py-2 text-lg font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  ADICIONAR AO CARRINHO 🛒
                </button>
              </form>
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
              <div>
                <h3 className='sr-only'>Descrição</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
