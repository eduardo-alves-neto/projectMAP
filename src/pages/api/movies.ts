import { NextApiRequest, NextApiResponse } from 'next';
import pool from './database';

const handleMoviesRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM movies');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao buscar os filmes' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleMoviesRequest;
