import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const playsRouter = Router();

const prisma = new PrismaClient();

playsRouter.get('/', async (_req, res) => {
  const allPlays = await prisma.play.findMany();

  return res.json(allPlays);
});

playsRouter.post('/', ensureAuthenticated, async (req, res) => {
  const {
    agent,
    map,
    usage,
    title,
    description,
    gifUrl,
    detailedImageUrl,
  } = req.body;

  const userId = req.user.id;

  const play = await prisma.play.create({
    data: {
      submitter: {
        connect: {
          id: userId,
        },
      },
      agent,
      map,
      usage,
      title,
      description,
      gifUrl,
      detailedImageUrl,
    },
  });

  return res.status(201).json(play);
});

export default playsRouter;
