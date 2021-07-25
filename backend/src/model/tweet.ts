import { User } from './user';

export type Tweet = {
  id: number;
  text: string;
  createdAt: Date;
  user: User;
};
