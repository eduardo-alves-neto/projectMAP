'use client';

import Link from 'next/link';
import { ChangeEvent, Suspense, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import Loading from '@/components/loading';
import formatCurrency from '@/utils/format-currency';
import { useCartStore } from '@/store/cart-store';
import { MoviesInCartType } from '@/types/movie-in-cart';
import Header from '@/components/header';

export default function CartPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, totalPrice, removeToCart, updateMovieInCart } = useCartStore();

  function handleAmountChange(
    event: ChangeEvent<HTMLInputElement>,
    movie: MoviesInCartType
  ) {
    event.preventDefault();

    const updatedmovie = {
      ...movie,
      amount: Number(event.target.value),
    };

    updateMovieInCart(updatedmovie);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header props={{ openMenu, setOpenMenu, openCart, setOpenCart }} />
      <main className="w-screen pb-8 pt-24 flex justify-center items-center max-h-[100vh]">
        <section className="w-full">
          <div className="mx-auto w-full max-w-screen-xl px-6 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col justify-center items-center">
            <div className="w-full mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="uppercase text-xl font-bold text-gray-900 sm:text-2xl">
                  Seus filmes
                </h1>
              </header>

              {cart?.length > 0 ? (
                <>
                  <div className="w-full mt-8">
                    <ul className="w-full space-y-4 max-h-[50vh] overflow-y-auto shadow p-4">
                      {cart.map((movie, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className="size-16 rounded object-cover"
                          />

                          <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <h3 className="text-sm font-medium text-gray-900">
                              {movie.title}
                            </h3>
                            <span className="inline pr-2">Preço:</span>
                            <span className="inline">
                              {formatCurrency(movie.price, 'BRL')}
                            </span>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <label className="sr-only"> Quantity </label>

                            <input
                              type="number"
                              min={1}
                              value={movie.amount}
                              onChange={(event) =>
                                handleAmountChange(event, movie)
                              }
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => removeToCart(movie)}
                              className="text-gray-600 transition hover:text-red-600"
                            >
                              <span className="sr-only">Remove item</span>

                              <TrashIcon className="h-6 w-6" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 w-full flex justify-between border-t border-gray-100 pt-8">
                      <div className="w-full space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd>{formatCurrency(totalPrice(), 'BRL')}</dd>
                          </div>

                          <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd>{formatCurrency(totalPrice(), 'BRL')}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end items-center gap-4 pt-4 mx-1">
                    <Link
                      href="/moviesPage"
                      className="block rounded bg-zinc-200 p-2 text-sm text-black font-semibold tracking-wider transition hover:bg-zinc-300"
                    >
                      Continue navegando pelo catalogo
                    </Link>
                    <Link
                      href="#"
                      className="block rounded bg-amaranth p-2 text-sm text-gray-100 font-semibold tracking-wider transition hover:bg-red-600"
                    >
                      Finalizar compra
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="my-12 flex justify-center items-center text-lg">
                    <p className="animate-pulse">Nenhum filme no carrinho...</p>
                  </div>
                  <div className="w-full flex justify-center items-center gap-4 pt-6 -m-2">
                    <Link
                      href="/moviesPage"
                      className="block rounded bg-zinc-200 p-2 text-sm text-black font-semibold tracking-wider transition hover:bg-zinc-300"
                    >
                      Continue navegando pelo catalogo
                    </Link>
                    <Link
                      href="#"
                      className="block rounded bg-amaranth p-2 text-sm text-gray-100 font-semibold tracking-wider transition hover:bg-red-600"
                    >
                      Finalizar compra
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
