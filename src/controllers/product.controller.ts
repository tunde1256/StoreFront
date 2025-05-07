import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { logger } from '../utils/logger'; 

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const listProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    logger.info(`Fetching products for category with ID ${categoryId}...`);

    const products = await prisma.product.findMany({
      where: { categoryId: Number(categoryId) },
    });

    if (products.length > 0) {
      logger.info(`Fetched ${products.length} products for category ID ${categoryId}`);
      res.json(products);
    } else {
      logger.warn(`No products found for category ID ${categoryId}`);
      res.status(404).json({ error: 'No products found for this category' });
    }
  } catch (error:any) {
    logger.error(`Failed to fetch products for category ID ${req.params.categoryId}: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
