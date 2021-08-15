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
}
