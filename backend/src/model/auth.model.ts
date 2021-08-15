import { Request } from 'express';
import { UserModel } from './user.model';

export type AuthModel = {
  token: string;
  username: string;
};

export interface AuthRequest extends Request {
  userId: number;
}

export interface AuthServiceInterface {
  login(token: string): Promise<AuthModel>;
  logout(): Promise<void>;
  me(): Promise<void>;
  signUp(userInfo: UserModel): Promise<AuthModel>;
}
