import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteMovies(request: Request, response: Response) {
  try {
    const { movieId } = request.params;
    const movies = await prisma.movies.delete({
      where: {
        id: movieId,
      },
    });

    return response.status(200).json({ message: 'Successfully deleted movie' });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
