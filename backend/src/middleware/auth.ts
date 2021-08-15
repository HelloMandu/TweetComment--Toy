import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';

const TEMP_KEY = 'TEMP';
const AUTH_ERROR = { message: 'Authentication Error' };
const userRepository = new UserRepository(mock_users);

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, TEMP_KEY, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};
