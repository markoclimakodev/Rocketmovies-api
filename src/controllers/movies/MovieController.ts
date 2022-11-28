import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class MovieController {
  async create(request: Request, response: Response) {
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

      return response.status(201).json({ movies });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }

  async list(request: Request, response: Response) {
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

  async update(request: Request, response: Response) {
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

  async delete(request: Request, response: Response) {
    try {
      const { movieId } = request.params;
      const movies = await prisma.movies.delete({
        where: {
          id: movieId,
        },
      });

      return response
        .status(200)
        .json({ message: `The movie ${movies.title} was deleted` });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }
}
