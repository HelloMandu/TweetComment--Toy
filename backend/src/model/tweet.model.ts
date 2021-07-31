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
  createTweet(newTweet: TweetModel): Promise<void>;
  updateTweet(newTweet: TweetModel): Promise<TweetModel | null>;
  deleteTweet(id: number): Promise<number | null>;
}
