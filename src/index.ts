import app from './app';

const PORT = process.env.PORT || 4000;

let prisma;
(async () => {
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})()