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
}

export default UserRepository;
