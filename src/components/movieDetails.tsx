import { MovieInformation } from '@/types/moviesInformations';
import React from 'react';

export const MovieDetails = ({ movie }: { movie: MovieInformation }) => {
  const movieData = [
    { description: 'Título Original', value: movie.original_title },
    { description: 'Idioma Original', value: movie.original_language },
    { description: 'Data de Lançamento', value: movie.release_date },
    { description: 'Duração', value: `${movie.runtime_minutes} minutos` },
    { description: 'Gêneros', value: movie.genres },
    { description: 'Popularidade', value: movie.popularity },
    { description: 'Tagline', value: movie.tagline },
    { description: 'Empresas de Produção', value: movie.production_companies },
    { description: 'País de Origem', value: movie.origin_country },
    { description: 'Média de Votos', value: movie.vote_average },
    { description: 'Contagem de Votos', value: movie.vote_count },
  ];

  return (
    <>
      {movieData.map((data, index) => (
        <p key={index}>
          <strong>{data.description}</strong>:
          {data.description === 'Popularidade' ? (
            <div className='flex gap-2 rounded rounded-lg'>
              <div className='relative grid select-none items-center whitespace-nowrap rounded-lg bg-blue-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white rounded rounded-lg'>
                <span className=''>{movie.popularity}</span>
              </div>
            </div>
          ) : (
            data.value
          )}
        </p>
      ))}
    </>
  );
};
