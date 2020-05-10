import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { omit } from 'remeda';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

const usersRouter = Router();

const prisma = new PrismaClient();

usersRouter.post('/', async (req, res) => {
  const { username, email, password: rawPassword } = req.body;

  const password = await hash(rawPassword, 0);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  if (!user) {
    throw new AppError('User creation failed', 500);
  }

  const userWithoutPassword = omit(user, ['password']);

  return res.status(201).json(userWithoutPassword);
});

export default usersRouter;
