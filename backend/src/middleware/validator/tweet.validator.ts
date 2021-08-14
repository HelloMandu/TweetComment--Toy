import { body } from 'express-validator';
import { errorHandler } from './error-handler';

export const tweetValidator = [
  body('text').trim().isLength({ min: 3 }).withMessage('text should be at least 3 characters'),
  errorHandler,
];
