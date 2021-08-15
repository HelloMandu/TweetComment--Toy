export type UserModel = {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  url?: string;
};

export interface UserRepositoryInterface {
  users: UserModel[];
  findById(id: number): Promise<UserModel | undefined>;
  findByUsername(username: string): Promise<UserModel | undefined>;
  createUser(user: Omit<UserModel, 'id'>): Promise<UserModel>;
}
