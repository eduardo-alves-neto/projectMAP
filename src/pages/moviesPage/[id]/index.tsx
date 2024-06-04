'use client';

import { FormEvent, useEffect, useState } from 'react';
import Header from '@/components/header';
import { useCartStore } from '@/store/cart-store';
import { GetServerSidePropsContext } from 'next';
import { MovieInformation } from '@/types/moviesInformations';
import CreditCardModal from '@/components/cardCreditModal';
import { MovieDetails } from '@/components/MovieDetails';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3000/api/moviesInformations`);

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
  movies: MovieInformation[];
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [movie, setmovie] = useState<MovieInformation>({} as MovieInformation);

  const { addToCart, cart } = useCartStore();
  const { toast } = useToast();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const isAlreadyInCart = cart.some((item) => item.id === movie.id);

    if (!isAlreadyInCart) {
      addToCart({
        id: movie.id,
        title: movie.original_title,
        price: 100,
        amount: 1,
        href: `moviesPage/${movie.id}`,
        poster_path: movie.poster_url ?? '',
        overview: movie.overview,
      });
      toast({
        className: 'z-[1002] bg-amaranth text-white rounded-xl',
        title: 'Filme adiconado',
        description: movie.original_title,
        variant: 'default',
        duration: 2000,
        action: (
          <ToastAction className='rounded-full' altText='OK'>
            OK
          </ToastAction>
        ),
      });
    }
  }

  useEffect(() => {
    movies.forEach((item: MovieInformation) => {
      item.id == Number(params.id) && setmovie(item);
    });
  }, []);

  return (
    <>
      <Header props={{ openCart, openMenu, setOpenCart, setOpenMenu }} />
      <CreditCardModal isOpen={openModal} onClose={() => setOpenModal(false)} />

      <main className='bg-white pt-36'>
        <div>
          <div className='mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
            <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
              {!!movie?.video_key ? (
                <iframe
                  src={`https://www.youtube.com/embed/68xkEZ4-nAs?autoplay=1&loop=1&playlist=${movie.video_key}`}
                  className='h-full w-full object-cover object-center'
                  allow='autoplay; fullscreen'
                  title={movie.original_title}
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}` ?? ''}
                  alt={movie.original_title}
                  className='h-full w-full object-cover object-center'
                />
              )}
            </div>
            <div className='pl-4 pt-10'>
              <MovieDetails movie={movie} />
            </div>
          </div>

          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {movie.original_title}
              </h1>
            </div>

            <div className='py-1 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
              <div>
                <h3 className='sr-only'>Descrição</h3>
                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>{movie.overview}</p>
                </div>
              </div>
            </div>

            <div className='p-6 mt-3 borde shadow-2xl border'>
              <p className='text-xl tracking-tight text-gray-900'>R$ {100}</p>

              <form
                onSubmit={handleSubmit}
                className='mt-4 flex items-center justify-center space-x-4'
              >
                <button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-lg border border-transparent bg-SteelBlue py-2 text-lg font-bold text-white hover:bg-aqua-island focus:outline-none focus:ring-2 f focus:ring-offset-2'
                >
                  Comprar 🛒
                </button>
                <button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  className='flex w-full items-center justify-center rounded-lg border border-transparent bg-SteelBlue py-2 text-lg font-bold text-white hover:bg-aqua-island focus:outline-none focus:ring-2  focus:ring-offset-2'
                >
                  Alugar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
