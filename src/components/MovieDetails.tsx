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
          <strong>{data.description}</strong>: {data.value}
        </p>
      ))}
    </>
  );
};
