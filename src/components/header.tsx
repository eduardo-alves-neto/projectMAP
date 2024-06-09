import { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import Cart from '@/components/cart';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';

const navigation = {
  pages: [
    { name: 'Página inical', href: '/' },
    { name: 'Filmes', href: '/moviesPage' },
    { name: 'Carrinho', href: '/cart' },
  ],
};

interface HeaderProps {
  openMenu: boolean;
  openCart: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  setOpenCart: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ props }: { props: HeaderProps }) {
  const { openCart, openMenu, setOpenCart, setOpenMenu } = props;

  const { cart } = useCartStore();

  return (
    <div className='bg-white'>
      <Cart props={{ openCart, setOpenCart }} />

      <Transition.Root show={openMenu} as={Fragment}>
        <Dialog
          as='div'
          className='relative lg:hidden z-[1000]'
          onClose={setOpenMenu}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpenMenu(false)}
                  >
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <div className='space-y-6 border-gray-200 px-4 py-6'>
                  {navigation.pages.map((page, index) => (
                    <div key={index} className='flow-root'>
                      <Link
                        href={page.href}
                        className='-m-2 block p-2 font-medium text-gray-900'
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  <div className='flow-root'>
                    <Link
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Fazer login
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Criar conta
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='fixed w-full bg-white z-[1000]'>
        <nav
          aria-label='Top'
          className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-gray-200'
        >
          <div className='w-full h-20'>
            <div className='h-full flex justify-center items-center'>
              <button
                type='button'
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                onClick={() => setOpenMenu(true)}
              >
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>

              <div className='pl-2 flex lg:pl-0'>
                <Link href='/'>
                  <span className='sr-only'>Your Company</span>
                  <div className='h-16 w-16 rounded-full'>
                    <Image
                      src='/LOGO.png'
                      alt='Logo'
                      width={64}
                      height={64}
                      layout='responsive'
                    />
                  </div>
                </Link>
              </div>

              <div className='hidden lg:flex justify-center items-center ml-6 gap-8'>
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:scale-105'
                  >
                    {page.name}
                  </Link>
                ))}
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <Link
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Fazer Login
                  </Link>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  <Link
                    href='#'
                    className='text-sm font-medium text-gray-700 hover:text-gray-800'
                  >
                    Criar Conta
                  </Link>
                </div>

                <div className='flex lg:ml-6'>
                  <Link
                    href='/moviesPage'
                    className='p-2 text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  </Link>
                </div>

                <div className='ml-4 flow-root lg:ml-6'>
                  <button
                    onClick={() => setOpenCart(true)}
                    className='group -m-2 flex items-center p-2'
                  >
                    <ShoppingCartIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      {cart.length}
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
