import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed categories and products
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        products: {
          create: [
            { name: 'Laptop', description: 'A nice laptop', price: 1200 },
            { name: 'Phone', description: 'Smartphone', price: 800 },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        name: 'Books',
        products: {
          create: [
            { name: 'Node.js Guide', description: 'Learn Node.js', price: 25 },
            { name: 'Prisma Handbook', description: 'ORM book', price: 20 },
          ],
        },
      },
    }),
    prisma.category.create({
      data: {
        name: 'Clothing',
        products: {
          create: [
            { name: 'T-Shirt', description: 'Cotton shirt', price: 15 },
            { name: 'Jeans', description: 'Denim jeans', price: 40 },
          ],
        },
      },
    }),
  ]);

  console.log('Seeded:', categories.length, 'categories with products');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
