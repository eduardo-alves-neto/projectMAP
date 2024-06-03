'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import Chat from '@/components/chat';
import Header from '@/components/header';
import { useCartStore } from '@/store/cart-store';
import { MoviesType } from '@/types/movie';

interface Props {
  params: { id: number };
}

export default function MoviesDetailsPage({ params }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [movie, setmovie] = useState<MoviesType>({} as MoviesType);
  const [amount, setAmount] = useState(1);

  const { addToCart } = useCartStore();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    addToCart({
      id: movie.id,
      title: movie.title,
      price: movie.price ?? 40,
      amount: amount,
      href: movie.href ?? '',
      poster_path: movie.poster_path ?? '',
      overview: movie.overview,
    });
  }

  // useEffect(() => {
  //   .forEach((item: MoviesType) => item.id == params.id && setmovie(item));
  // }, []);

  return (
    <>
      <Header props={{ openCart, openMenu, setOpenCart, setOpenMenu }} />

      <main className='bg-white pt-36'>
        <div>
          <div className='mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
            <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}` ?? ''}
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
              <p className='text-xl tracking-tight text-gray-900'>R$ {movie.price}</p>

              <form onSubmit={handleSubmit} className='mt-4'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-lg border border-transparent bg-amaranth py-2 text-lg font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                >
                  ADICIONAR AO CARRINHO 🛒
                </button>
                <div className='mt-4 text-white w-full flex justify-center items-center gap-2'>
                  <button
                    onClick={() => amount > 1 && setAmount(amount - 1)}
                    type='button'
                    className='bg-amaranth h-12 w-12 rounded-full flex justify-center items-center'
                  >
                    <MinusIcon className='h-6 w-6' />
                  </button>
                  <span className='bg-amaranth h-12 w-16 flex justify-center items-center text-xl font-bold rounded-xl'>
                    {amount}
                  </span>
                  <button
                    onClick={() => setAmount(amount + 1)}
                    type='button'
                    className='bg-amaranth h-12 w-12 rounded-full flex justify-center items-center'
                  >
                    <PlusIcon className='h-6 w-6' />
                  </button>
                </div>
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

      {openChat && <Chat props={{ setOpenChat }} />}
    </>
  );
}
