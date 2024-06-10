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
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ message: `Erro ao buscar os filmes: ${erro}` });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleMoviesRequest;
