"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.listCategories = exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const client_1 = require("../prisma/client");
const logger_1 = require("../utils/logger");
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await client_1.prisma.category.findFirst({
            where: { name },
        });
        if (existingCategory) {
            logger_1.logger.warn(`Category already exists with name: ${name}`);
            return res.status(409).json({ error: 'Category already exists' });
        }
        const category = await client_1.prisma.category.create({ data: { name } });
        logger_1.logger.info(`Category created: ${category.name} (ID: ${category.id})`);
        return res.status(201).json(category);
    }
    catch (error) {
        logger_1.logger.error(`Failed to create category: ${error.message}`);
        return res.status(500).json({ error: 'Failed to create category' });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        logger_1.logger.info(`Updating category with ID ${id}...`);
        const category = await client_1.prisma.category.update({
            where: { id: Number(id) },
            data: { name },
        });
        logger_1.logger.info(`Category updated: ${category.name} (ID: ${category.id})`);
        res.json(category);
    }
    catch (error) {
        logger_1.logger.error(`Failed to update category with ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Failed to update category' });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        logger_1.logger.info(`Deleting category with ID ${id}...`);
        await client_1.prisma.category.delete({ where: { id: Number(id) } });
        logger_1.logger.info(`Category deleted: ID ${id}`);
        res.json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        logger_1.logger.error(`Failed to delete category with ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
exports.deleteCategory = deleteCategory;
const listCategories = async (req, res) => {
    try {
        const categories = await client_1.prisma.category.findMany();
        logger_1.logger.info(`Fetched ${categories.length} categories`);
        res.json(categories);
    }
    catch (error) {
        logger_1.logger.error(`Failed to fetch categories: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.listCategories = listCategories;
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        logger_1.logger.info(`Fetching category with ID ${id}...`);
        const category = await client_1.prisma.category.findUnique({
            where: { id: Number(id) },
            include: { products: true },
        });
        if (category) {
            logger_1.logger.info(`Fetched category: ${category.name} (ID: ${category.id})`);
            res.json(category);
        }
        else {
            logger_1.logger.warn(`Category not found with ID ${id}`);
            res.status(404).json({ error: 'Category not found' });
        }
    }
    catch (error) {
        logger_1.logger.error(`Failed to fetch category with ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};
exports.getCategory = getCategory;
