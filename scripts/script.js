const axios = require('axios');
const pkg = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

async function populateDatabase() {
  try {
    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?language=pt-BR`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` },
      },
    );
    const movies = tmdbResponse.data.results;
    for (const movie of movies) {
      try {
        await pool.query(
          'INSERT INTO movies (id, title, overview, poster_path, href) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
          [movie.id, movie.title, movie.overview, movie.poster_path, 'moviesPage'],
        );

        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=pt-BR`,
          {
            headers: { Authorization: `Bearer ${process.env.TOKEN}` },
          },
        );
        const movieDetails = movieDetailsResponse.data;

        const movieVideosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            headers: { Authorization: `Bearer ${process.env.TOKEN}` },
          },
        );
        const videoKey = movieVideosResponse.data.results[0]?.key;

        await pool.query(
          'INSERT INTO moviesInformations (id, original_title, original_language, release_date, runtime_minutes, genres, overview, popularity, revenue, poster_url, official_website, tagline, production_companies, origin_country, vote_average, vote_count, collection_id, collection_name, collection_poster_path, collection_backdrop_path, backdrop_path, video_key) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) ON CONFLICT (id) DO NOTHING',
          [
            movieDetails.id,
            movieDetails.original_title,
            movieDetails.original_language,
            movieDetails.release_date,
            movieDetails.runtime,
            movieDetails.genres.map((genre) => genre.name).join(', '),
            movieDetails.overview,
            movieDetails.popularity,
            movieDetails.revenue,
            movieDetails.poster_path,
            movieDetails.homepage,
            movieDetails.tagline,
            movieDetails.production_companies.map((company) => company.name).join(', '),
            movieDetails.production_countries.map((country) => country.iso_3166_1).join(', '),
            movieDetails.vote_average,
            movieDetails.vote_count,
            movieDetails.belongs_to_collection?.id,
            movieDetails.belongs_to_collection?.name,
            movieDetails.belongs_to_collection?.poster_path,
            movieDetails.belongs_to_collection?.backdrop_path,
            movieDetails.backdrop_path,
            videoKey,
          ],
        );
      } catch (error) {
        console.error('Error inserting movie:', error);
      }
    }

    console.log('Movies fetched and stored successfully');
    console.log('Closing connection to database...');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching and storing movies:', error.message);
    } else {
      console.error('An unknown error occurred while fetching and storing movies');
    }
  }
}

populateDatabase();
