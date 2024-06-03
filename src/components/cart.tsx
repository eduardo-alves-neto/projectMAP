'use client';

import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import formatCurrency from '@/utils/format-currency';
import { useCartStore } from '@/store/cart-store';

interface CartProps {
  openCart: boolean;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

export default function Cart({ props }: { props: CartProps }) {
  const { openCart, setOpenCart } = props;

  const { cart, removeToCart, totalPrice } = useCartStore();

  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as='div' className='relative z-[1000]' onClose={setOpenCart}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0'>
          <div className='fixed inset-0'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-hidden bg-white shadow-xl'>
                    <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-lg font-medium text-gray-900'>
                          Carrinho
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                            onClick={() => setOpenCart(false)}
                          >
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      {cart.length == 0 ? (
                        <div className='h-full flex justify-center items-center overflow-y-hidden'>
                          <span className='animate-pulse'>Carrinho vazio...</span>
                        </div>
                      ) : (
                        <>
                          <div className='mt-8'>
                            <div className='flow-root'>
                              <ul role='list' className='-my-6 divide-y divide-gray-200'>
                                {cart?.map((movie, index) => (
                                  <li key={index} className='flex py-6'>
                                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                      <img
                                        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                                        alt={movie.title}
                                        className='h-full w-full object-cover object-center'
                                      />
                                    </div>

                                    <div className='ml-4 flex flex-1 flex-col'>
                                      <div>
                                        <div className='flex justify-between text-base font-medium text-gray-900'>
                                          <h3>
                                            <Link href={movie.href}>{movie.title}</Link>
                                          </h3>
                                          <p className='ml-4'>
                                            {formatCurrency(movie.price * movie.amount, 'BRL')}
                                          </p>
                                        </div>
                                      </div>
                                      <div className='flex flex-1 items-end justify-between text-sm'>
                                        <p className='text-gray-500'>Quantidade: {movie.amount}</p>

                                        <div className='flex'>
                                          <button
                                            onClick={() => removeToCart(movie)}
                                            type='button'
                                            className='font-medium text-amaranth hover:text-red-700'
                                          >
                                            Remover
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>{formatCurrency(totalPrice(), 'BRL')}</p>
                      </div>

                      <div className='mt-6'>
                        <Link
                          href='/carrinho'
                          className='w-full flex items-center justify-center rounded-md border border-transparent bg-amaranth px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700'
                        >
                          Finalizar Compra
                        </Link>
                      </div>
                      <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                        <p>
                          ou{' '}
                          <button
                            type='button'
                            className='font-medium text-amaranth hover:text-red-700'
                            onClick={() => setOpenCart(false)}
                          >
                            Continue Comprando
                            <span aria-hidden='true'> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
