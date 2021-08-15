import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';

const JWT_SECRET_KEY = 'KEY';
const JWT_EXPIRES_IN_DAY = '2d';
const BCRYPT_SALT_ROUNDS = 12;

const userRepository = new UserRepository(mock_users);

const signUp = async (req: Request, res: Response) => {
  const { username, password, name, email, url } = req.body;

  const isExistUser = await userRepository.findByUsername(username);
  if (isExistUser) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

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
  const { username, password } = req.body;

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

const createToken = (id: number) => {
  return jwt.sign(id.toString(), JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN_DAY });
};

export { signUp, login };
