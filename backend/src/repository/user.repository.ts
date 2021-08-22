import { UserInfo, UserRepositoryInterface } from '../model/userInfo';
import { mock_users } from '../data/mock_users';

class UserRepository implements UserRepositoryInterface {
  users: UserInfo[];

  constructor(users: UserInfo[]) {
    this.users = users;
  }

  async findById(id: string): Promise<UserInfo | undefined> {
    return mock_users.find((user) => user.id === id);
  }

  async findByUsername(username: string): Promise<UserInfo | undefined> {
    return mock_users.find((user) => user.username === username);
  }

  async createUser(user: Omit<UserInfo, 'id'>): Promise<UserInfo> {
    const newUser = { id: (mock_users.length + 1).toString(), ...user };
    mock_users.push(newUser);
    return newUser;
  }
}

export default UserRepository;
