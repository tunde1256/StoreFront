import { Request, Response } from 'express';
import { prisma } from '..//prisma/client';
import { logger } from '../utils/logger'; 

export const createCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;

    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      logger.warn(`Category already exists with name: ${name}`);
      return res.status(409).json({ error: 'Category already exists' });
    }

    const category = await prisma.category.create({ data: { name } });
    logger.info(`Category created: ${category.name} (ID: ${category.id})`);
    return res.status(201).json(category);
  } catch (error: any) {
    logger.error(`Failed to create category: ${error.message}`);
    return res.status(500).json({ error: 'Failed to create category' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    logger.info(`Updating category with ID ${id}...`);

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    logger.info(`Category updated: ${category.name} (ID: ${category.id})`);
    res.json(category);
  } catch (error: any) {
    logger.error(`Failed to update category with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    logger.info(`Deleting category with ID ${id}...`);

    await prisma.category.delete({ where: { id: Number(id) } });
    logger.info(`Category deleted: ID ${id}`);
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    logger.error(`Failed to delete category with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    logger.info(`Fetched ${categories.length} categories`);
    res.json(categories);
  } catch (error: any) {
    logger.error(`Failed to fetch categories: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    logger.info(`Fetching category with ID ${id}...`);

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: { products: true },
    });

    if (category) {
      logger.info(`Fetched category: ${category.name} (ID: ${category.id})`);
      res.json(category);
    } else {
      logger.warn(`Category not found with ID ${id}`);
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error: any) {
    logger.error(`Failed to fetch category with ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};
