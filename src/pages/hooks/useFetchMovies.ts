import { MoviesType } from '@/types/movie';
import { MovieInformation } from '@/types/moviesInformations';
import { useEffect, useState } from 'react';

export function useFetchMovies() {
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [moviesInformations, setMoviesInformations] = useState<
    MovieInformation[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMovies = await fetch(`http://localhost:3000/api/movies`);
        const resMoviesInformations = await fetch(
          `http://localhost:3000/api/moviesInformations`
        );

        if (!resMovies.ok || !resMoviesInformations.ok) {
          console.error('response from API was not successful');
          setMovies([]);
          setMoviesInformations([]);
        } else {
          const moviesData = await resMovies.json();
          const moviesInformationsData = await resMoviesInformations.json();
          setMovies(moviesData);
          setMoviesInformations(moviesInformationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { movies, moviesInformations, loading };
}
