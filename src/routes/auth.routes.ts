import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', rateLimiter,register);
router.post('/login', login);

export default router;