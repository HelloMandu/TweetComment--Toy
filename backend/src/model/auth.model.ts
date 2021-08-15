import { UserModel } from './user.model';

export type AuthModal = {
  token: string;
  username: string;
};

export interface AuthServiceInterface {
  signUp(userInfo: UserModel): Promise<AuthModal>;
  login(username: string, password: string): Promise<AuthModal>;
  logout(): Promise<void>;
  me(): Promise<void>;
}
