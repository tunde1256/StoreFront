import { Router } from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
} from '../controllers/category.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeAdmin } from '../middleware/role.middleware';

const router = Router();

router.get('/get-all', listCategories);
router.get('/:id', getCategory);


router.post('/create-category', authenticate, authorizeAdmin, createCategory);
router.put('/:id', authenticate, authorizeAdmin, updateCategory);
router.delete('/:id', authenticate, authorizeAdmin, deleteCategory);

export default router;
