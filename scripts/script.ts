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
      } catch (error) {
        console.error('Error inserting movie:');
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
