import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { omit } from 'remeda';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

const sessionsRouter = Router();

const prisma = new PrismaClient();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new AppError('Invalid email/password combination.', 401);
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError('Invalid email/password combination.', 401);
  }

  const { secret, expiresIn } = authConfig;

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn,
  });

  const userWithoutPassword = omit(user, ['password']);

  return res.json({ user: userWithoutPassword, token });
});

export default sessionsRouter;
