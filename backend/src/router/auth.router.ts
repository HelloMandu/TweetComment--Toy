import express from 'express';
import { login, signUp } from '../controller/auth.controller';
import { validateCredential, validateSignUp } from '../middleware/validator/auth.validator';

const router = express.Router();

router.post('/signUp', validateSignUp, signUp);

router.get('/login', validateCredential, login);

export default router;
