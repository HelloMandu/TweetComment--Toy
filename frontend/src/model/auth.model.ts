import { UserInfo } from './user.model';

export type Auth = {
  token: string;
  user: UserInfo;
};

export interface TokenServiceInterface {
  get getToken(): string;
  set setToken(token: string);
  deleteToken(): void;
}

export interface AuthServiceInterface {
  login(username: string, password: string): Promise<Auth>;
  me(): Promise<{ token: string | null; user: UserInfo }>;
  logout(): void;
  signup(
    username: string,
    password: string,
    name: string,
    email: string,
    url?: string
  ): Promise<UserInfo>;
}
