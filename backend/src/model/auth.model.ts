import { UserModel } from './user.model';

export type AuthModel = {
  token: string;
  username: string;
};

export interface AuthServiceInterface {
  login(token: string): Promise<AuthModel>;
  logout(): Promise<void>;
  me(): Promise<void>;
  signUp(userInfo: UserModel): Promise<AuthModel>;
}
