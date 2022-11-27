import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listMovies(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    const movies = await prisma.movies.findMany({
      where: {
        userId,
      },
    });

    return response.status(200).json(movies);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
