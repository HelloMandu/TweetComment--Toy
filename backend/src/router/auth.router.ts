import express from 'express';
import { login, signUp } from '../controller/auth.controller';
import { validateCredential, validateSignUp } from '../middleware/validator/auth.validator';

const router = express.Router();

router.post('/signUp', validateCredential, signUp);

router.put('/login', validateSignUp, login);

export default router;
