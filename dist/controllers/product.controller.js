"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = exports.getProduct = exports.listProductsByCategory = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const client_1 = require("../prisma/client");
const logger_1 = require("../utils/logger");
const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        const product = await client_1.prisma.product.create({
            data: {
                name,
                description,
                price,
                categoryId,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await client_1.prisma.product.update({
            where: { id: Number(id) },
            data: { name, description, price },
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await client_1.prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
exports.deleteProduct = deleteProduct;
const listProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        logger_1.logger.info(`Fetching products for category with ID ${categoryId}...`);
        const products = await client_1.prisma.product.findMany({
            where: { categoryId: Number(categoryId) },
        });
        if (products.length > 0) {
            logger_1.logger.info(`Fetched ${products.length} products for category ID ${categoryId}`);
            res.json(products);
        }
        else {
            logger_1.logger.warn(`No products found for category ID ${categoryId}`);
            res.status(404).json({ error: 'No products found for this category' });
        }
    }
    catch (error) {
        logger_1.logger.error(`Failed to fetch products for category ID ${req.params.categoryId}: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.listProductsByCategory = listProductsByCategory;
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await client_1.prisma.product.findUnique({
            where: { id: Number(id) },
            include: { category: true },
        });
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};
exports.getProduct = getProduct;
const listProducts = async (req, res) => {
    try {
        const products = await client_1.prisma.product.findMany();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
exports.listProducts = listProducts;
