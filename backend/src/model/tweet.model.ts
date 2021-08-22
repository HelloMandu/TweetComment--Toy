import { UserModel } from './userInfo';

export type TweetModel = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

export type TweetResult = {
  tweet: TweetModel;
  user: UserModel;
};

export interface TweetRepositoryInterface {
  tweets: TweetModel[];
  getTweets(): Promise<TweetModel[]>;
  getTweetById(id: string): Promise<TweetModel | undefined>;
  createTweet(newTweet: TweetModel): Promise<void>;
  updateTweet(id: string, text: string): Promise<TweetModel | undefined>;
  deleteTweet(id: string): Promise<TweetModel | undefined>;
}
