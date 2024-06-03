'use client';

import Link from 'next/link';
import { FormEvent, Fragment, Suspense, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';

import Header from '@/components/header';
import Chat from '@/components/chat';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import ListMovies from '@/components/list-movies';
import fetch from 'node-fetch';
import { MoviesType } from '@/types/movie';

const sortOptions = [
  { name: 'Relevância', href: '#', current: true },
  { name: 'Maior Preço', href: '#', current: false },
  { name: 'Menor preço', href: '#', current: false },
];

const filters = [
  {
    id: 'category',
    name: 'Categoria',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/movies`);

  if (!res.ok) {
    console.error('A resposta da API não foi bem-sucedida');
    return { props: { movies: [] } };
  }

  const movies = await res.json();

  return { props: { movies } };
}

export default function MoviesPage({ movies }: { movies: MoviesType[] }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState<string | null>();
  const [showSearch, setShowSearch] = useState(false);

  const router = useRouter();
  const searchParams = new URLSearchParams(usePathname().toString());

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    searchParams.set('query', search);
    setQuery(searchParams.get('query'));

    if (query == '' || query == null || search == '' || search == null) {
      router.push('/moviesPage');
      setShowSearch(false);
      return;
    }

    const filteredmovies = movies.filter((movie: any) =>
      movie.name.toLowerCase().includes(search.toLowerCase()),
    );

    setShowSearch(true);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header props={{ openCart, setOpenCart, openMenu, setOpenMenu }} />

      <div className='bg-white pt-10'>
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog className='relative z-[1001] lg:hidden' onClose={setMobileFiltersOpen}>
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
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-hidden bg-white py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4'>
                      <h2 className='text-lg font-medium text-gray-900'>Filtros</h2>
                      <button
                        type='button'
                        className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4 border-t border-gray-200'>
                      {filters.map((section) => (
                        <Disclosure
                          as='div'
                          key={section.id}
                          className='border-t border-gray-200 px-4 py-6'
                        >
                          {({ open }) => (
                            <>
                              <h3 className='-mx-2 -my-3 flow-root'>
                                <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                                  <span className='font-medium text-gray-900'>{section.name}</span>
                                  <span className='ml-6 flex items-center'>
                                    {open ? (
                                      <MinusIcon className='h-5 w-5' aria-hidden='true' />
                                    ) : (
                                      <PlusIcon className='h-5 w-5' aria-hidden='true' />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className='mx-auto w-full max-w-7xl px-0 sm:px-6 lg:px-8'>
            <div className='w-full flex items-center justify-end pb-6 px-4 sm:px-0 pt-24'>
              <div className='w-full flex items-center'>
                <Menu as='div' className='w-full text-left flex justify-between items-center'>
                  <form
                    onSubmit={handleSubmit}
                    className='w-full flex justify-between items-center'
                  >
                    <div className='relative'>
                      <label className='sr-only'> Search </label>

                      <input
                        type='text'
                        id='Search'
                        placeholder='O que está procurando?'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-80 sm:w-full rounded-xl border border-black pl-4 py-3 sm:py-2.5 pe-10 text-xs sm:text-sm'
                      />

                      <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
                        <button type='submit' className='text-gray-600 hover:text-gray-700'>
                          <span className='sr-only'>Search</span>

                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            color='black'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='currentColor'
                            className='h-4 w-4'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                          </svg>
                        </button>
                      </span>
                    </div>
                    <div>
                      <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                        Ordenar
                        <ChevronDownIcon
                          className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>
                  </form>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute top-9 right-0 z-[1001] mt-2 w-40 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <Link
                                href={option.href}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm',
                                )}
                              >
                                {option.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type='button'
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className='sr-only'>Filters</span>
                  <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>

            <section aria-labelledby='movies-heading' className='pb-24'>
              <h2 id='movies-heading' className='sr-only'>
                Filmes
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                {/* movies grid */}
                <div className='lg:col-span-3'>
                  {showSearch && (
                    <div className='mb-12 mt-6 flex justify-center items-center text-lg'>
                      <p>
                        Resultados para: <span className='font-semibold uppercase'>{query}</span>
                      </p>
                    </div>
                  )}

                  <ListMovies movies={movies} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <button
        onClick={() => setOpenChat(true)}
        className='fixed bottom-4 right-4 p-3 bg-amaranth hover:bg-red-600 border border-white rounded-full flex justify-center items-center sm:hidden'
      >
        <ChatBubbleOvalLeftEllipsisIcon className='text-white h-8 w-8' />
      </button>

      {openChat && <Chat props={{ setOpenChat }} />}

      <Footer />
    </Suspense>
  );
}
