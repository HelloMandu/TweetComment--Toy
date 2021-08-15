import { body } from 'express-validator';
import { errorHandler } from './error-handler';

const validateCredential = [
  body('username').trim().notEmpty().withMessage('username is required'),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('password is required, at least 5 characters'),
  errorHandler,
];

const validateSignUp = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid URL').optional({ nullable: true, checkFalsy: true }),
  errorHandler,
];

export { validateCredential, validateSignUp };
