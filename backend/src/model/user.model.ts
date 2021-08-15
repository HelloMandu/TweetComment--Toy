export type UserModel = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  url?: string;
};

export interface UserRepositoryInterface {
  users: UserModel[];
  findById(id: string): Promise<UserModel | undefined>;
  findByUsername(username: string): Promise<UserModel | undefined>;
  createUser(user: Omit<UserModel, 'id'>): Promise<UserModel>;
}
