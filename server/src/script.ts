import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
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
