import { NextApiRequest, NextApiResponse } from 'next';
import pool from './database';

const handleMoviesInformations = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM moviesInformations');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Ocorreu um erro ao buscar as informações dos filme',
      });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleMoviesInformations;
