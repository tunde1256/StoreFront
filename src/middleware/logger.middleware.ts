import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
};
