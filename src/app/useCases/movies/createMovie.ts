import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createMovies(request: Request, response: Response) {
  try {
    const userId = request.params.userId;
    const { title, description, rating, tags } = request.body;

    const movies = await prisma.movies.create({
      data: {
        userId,
        title,
        description,
        rating,
        tags,
      },
    });

    return response.status(201).json(movies);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
