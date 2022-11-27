import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function updateMovies(request: Request, response: Response) {
  try {
    const { movieId } = request.params;
    const { title, description, rating } = request.body;
    const movies = await prisma.movies.update({
      where: { id: movieId },
      data: { title, description, rating },
    });

    return response.status(200).json(movies);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
