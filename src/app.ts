import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import { requestLogger, errorLogger } from './middleware/logger.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger); 

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(errorLogger); 

export default app;
