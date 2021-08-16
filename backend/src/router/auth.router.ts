import express from 'express';
import { login, me, signUp } from '../controller/auth.controller';
import { validateCredential, validateSignUp } from '../middleware/validator/auth.validator';
import { isAuth } from '../middleware/auth';

const router = express.Router();

router.post('/signUp', validateSignUp, signUp);

router.post('/login', validateCredential, login);

router.get('/me', isAuth, me);

export default router;
