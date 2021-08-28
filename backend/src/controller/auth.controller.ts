import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';
import { UserInfo } from '../model/userInfo';
import { config } from '../config';

const userRepository = new UserRepository(mock_users);

const signUp = async (req: Request, res: Response) => {
  const { username, password, name, email, url }: Omit<UserInfo, 'id'> = req.body;

  const isExistUser = await userRepository.findByUsername(username);
  if (isExistUser) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  const user = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createToken(user.id);
  res.status(201).json({ token, user });
};

const login = async (req: Request, res: Response) => {
  const { username, password }: Pick<UserInfo, 'username' | 'password'> = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const token = createToken(user.id);
  res.status(201).json({ token, user });
};

const me = async (req: Request, res: Response) => {
  const { userId } = req;
  if (!userId) {
    return res.status(404).json({ message: `User ${userId} is not found` });
  }
  const user = await userRepository.findById(userId);
  if (!user) {
    return res.status(404).json({ message: `User ${userId} is not found` });
  }
  return res.status(200).json(user);
};

const createToken = (id: string) => {
  return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
};

export { signUp, login, me };
