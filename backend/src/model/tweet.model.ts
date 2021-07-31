import { UserModel } from './user.model';

export type TweetModel = {
  id: number;
  text: string;
  createdAt: Date;
  user: UserModel;
};

export interface Tweet {
  tweets: TweetModel[];
  getTweets(): Promise<TweetModel[]>;
  getTweetById(id: number): Promise<TweetModel | undefined>;
  getTweetsByUsername(username: string): Promise<TweetModel[] | undefined>;
  createTweet(newTweet: TweetModel): Promise<void>;
  updateTweet(id: number, text: string): Promise<number | null>;
  deleteTweet(id: number): Promise<number | null>;
}
