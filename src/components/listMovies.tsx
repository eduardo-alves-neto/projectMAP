'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';
import { useCartStore } from '@/store/cart-store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { MoviesType } from '@/types/movie';

export default function ListMovies({ movies }: { movies: MoviesType[] }) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  function handleAddToCart(movie: MoviesType) {
    addToCart({
      id: movie.id,
      title: movie.title,
      price: 100,
      amount: 1,
      href: movie.href ?? '',
      poster_path: movie.poster_path,
      overview: movie.overview,
    });

    toast({
      className: 'z-[1002] bg-amaranth text-white rounded-xl',
      title: 'Filme adiconado',
      description: movie.title,
      variant: 'default',
      duration: 2000,
      action: (
        <ToastAction className='rounded-full' altText='OK'>
          OK
        </ToastAction>
      ),
    });
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='mx-auto max-w-screen-xl px-6 pb-8 sm:px-6 lg:px-8'>
        <ul className='mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {movies?.length > 0 ? (
            movies?.map((movie, index) => (
              <li className='mt-4 border-2' key={index}>
                <Link
                  href={`${movie.href}/${movie.id}` ?? ''}
                  className='group block overflow-hidden'
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt={movie.title}
                    className='h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full object-cover sm:object-contain transition duration-500 group-hover:scale-105'
                  />
                </Link>
                <div className='flex justify-end mt-5'>
                  <button
                    onClick={() => handleAddToCart(movie)}
                    className='flex justify-center items-center uppercase bg-SteelBlue font-bold text-white text-sm sm:text-md tracking-wide py-[0.5rem] w-full mr-2 rounded-[4px]'
                  >
                    <p className='text-sm sm:text-md sm:px-1'>🛒</p>
                  </button>
                  <button className='flex justify-center items-center uppercase bg-SteelBlue font-bold text-white text-sm sm:text-md tracking-wide py-[0.5rem] w-full rounded-[4px]'>
                    <p className='text-sm sm:text-md sm:px-1'>Alugar</p>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className='animate-pulse w-full sm:w-[650px] mx-auto py-32 flex justify-center items-center text-center'>
              Nenhum filme encontrado...
            </li>
          )}
        </ul>
      </div>
    </Suspense>
  );
}
