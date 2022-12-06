import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email, password, avatar } = request.body;

      const checkIfUserExists = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (checkIfUserExists) {
        return response.status(401).json({ message: 'Email already in use' });
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
      const { name, email, password, old_password } = request.body;

      const user = await prisma.users.findFirst({
        where: {
          id: userId,
        },
      });

      console.log(user?.password);

      if (!user) {
        return response.status(201).json({ message: 'User not found' });
      }

      const userUpdatedEmail = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (userUpdatedEmail && userUpdatedEmail.id !== userId) {
        return response.status(201).json({ message: 'Email already in use' });
      }

      if (password && !old_password) {
        return response
          .status(201)
          .json({ message: 'Please inform your old password to proceed ' });
      }

      if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password);
        console.log(old_password, user.password);

        if (!checkOldPassword) {
          return response.status(201).json({ message: 'Password not match' });
        }
      }

      const hashedPassword = await hash(password, 8);

      const updateUser = await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      return response.status(201).json({ user });
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
  }
}
