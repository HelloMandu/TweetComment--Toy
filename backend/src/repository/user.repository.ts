import { UserModel, UserRepositoryInterface } from '../model/user.model';
import { mock_users } from '../data/mock_users';

class UserRepository implements UserRepositoryInterface {
  users: UserModel[];

  constructor(users: UserModel[]) {
    this.users = users;
  }

  async findById(id: number): Promise<UserModel | undefined> {
    return mock_users.find((user) => user.id === id);
  }

  async findByUsername(username: string): Promise<UserModel | undefined> {
    return mock_users.find((user) => user.username === username);
  }

  async createUser(user: Omit<UserModel, 'id'>): Promise<UserModel> {
    const newUser = { id: mock_users.length + 1, ...user };
    mock_users.push(newUser);
    return newUser;
  }
}

export default UserRepository;
