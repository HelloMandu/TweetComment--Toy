export type UserModel = {
  name: string;
  username: string;
  url?: string;
};

export type UserInfo = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  url?: string;
};

export interface UserRepositoryInterface {
  users: UserInfo[];
  findById(id: string): Promise<UserInfo | undefined>;
  findByUsername(username: string): Promise<UserInfo | undefined>;
  createUser(user: Omit<UserInfo, 'id'>): Promise<UserInfo>;
}
