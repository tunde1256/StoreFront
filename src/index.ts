import app from './app';

const PORT = process.env.PORT || 4000;

let prisma;
(async () => {
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient();

  // Start server here after client is ready
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})()