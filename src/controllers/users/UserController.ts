import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, password, avatar } = request.body;

      const checkIfUserExists = await prisma.users.findFirst({where: {
        email:email
      }});

      if(checkIfUserExists) {
        return response.status(401).json({message: 'Email already in use'})
      }

      const hashedPassword = await hash(password, 8);
      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatar,
        },
      });
      return response.status(201).json({ user });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { userId } = request.params;
      const { name, email, password, avatar } = request.body;

      const user = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          password,
          avatar,
        },
      });
      return response.status(201).json({ user });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }
}
