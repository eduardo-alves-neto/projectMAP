'use client';

import Link from 'next/link';
import { FormEvent, Fragment, Suspense, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import ListMovies from '@/components/listMovies';
import fetch from 'node-fetch';
import { MoviesType } from '@/types/movie';

const sortOptions = [
  { name: 'Relevância', href: '#', current: true },
  { name: 'Maior Preço', href: '#', current: false },
  { name: 'Menor preço', href: '#', current: false },
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
  const [moviesData, setMoviesData] = useState([...movies]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
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
      setMoviesData(movies);
      setShowSearch(false);
      return;
    }

    const filteredmovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setMoviesData(filteredmovies);
    setShowSearch(true);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Header props={{ openCart, setOpenCart, openMenu, setOpenMenu }} />

      <main className="mx-auto w-full max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-end pb-6 px-4 sm:px-0 pt-24">
          <div className="w-full flex items-center">
            <Menu
              as="div"
              className="w-full text-left flex justify-between items-center"
            >
              <form
                onSubmit={handleSubmit}
                className="w-full flex justify-between items-center"
              >
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="O que está procurando?"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-80 sm:w-full rounded-xl border border-black pl-4 py-3 sm:py-2.5 pe-10 text-xs sm:text-sm"
                  />

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="submit"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <span className="sr-only">Search</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="black"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordenar
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
              </form>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute top-9 right-0 z-[1001] mt-2 w-40 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <Link
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
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
          </div>
        </div>

        <section aria-labelledby="movies-heading" className="pb-24">
          <h2 id="movies-heading" className="sr-only">
            Filmes
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* movies grid */}
            <div className="lg:col-span-3">
              {showSearch && (
                <div className="mb-12 mt-6 flex justify-center items-center text-lg">
                  <p>
                    Resultados para:{' '}
                    <span className="font-semibold uppercase">{query}</span>
                  </p>
                </div>
              )}

              <ListMovies movies={moviesData} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Suspense>
  );
}
