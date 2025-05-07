import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProductsByCategory,
  getProduct,
} from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeAdmin } from '../middleware/role.middleware';

const router = Router();

router.get('/category/:categoryId', listProductsByCategory);
router.get('/:id', getProduct);

router.post('/create-product', authenticate, authorizeAdmin, createProduct);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

export default router;
