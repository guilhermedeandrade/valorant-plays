import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.create({
    data: {
      email: 'foo@email.com',
      username: 'foo',
      password: 'kekw',
    },
  });

  await prisma.play.create({
    data: {
      map: 'Bind',
      agent: 'Sova',
      usage: 'Offensive',
      title: 'Lorem Ipsum Arrow',
      gifUrl: 'https://gif-url',
      detailedImageUrl: 'https://detailed-img-url',
      submitter: {
        connect: { username: 'foo' },
      },
      description: 'op arrow pls nerf',
    },
  });

  const allUsers = await prisma.user.findMany();
  const allPlays = await prisma.play.findMany();

  console.log(allUsers);
  console.log(allPlays);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
