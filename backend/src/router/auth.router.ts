import express from 'express';
import { validateCredential, validateSignUp } from '../middleware/validator/auth.validator';
import { isAuth } from '../middleware/auth';
import UserController from '../controller/auth.controller';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';

const router = express.Router();
const userController = new UserController({
  userRepository: new UserRepository(mock_users)
})

router.post('/signUp', validateSignUp, userController.signUp.bind(userController));

router.post('/login', validateCredential, userController.login.bind(userController));

router.get('/me', isAuth, userController.me.bind(userController));

export default router;
