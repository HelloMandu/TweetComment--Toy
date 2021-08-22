import { UserModel } from './user.model';

export type TweetModel = {
  id: number;
  text: string;
  createdAt: Date;
  userId: string;
};

export interface TweetInterface {
  getTweets(username?: string): Promise<{ tweet: TweetModel; user?: UserModel }[]>;
  getTweetsById(id: number): Promise<TweetModel>;
  createTweet(text: string, username: string, user: string): Promise<TweetModel>;
  updateTweet(tweetId: number, text: string): Promise<TweetModel>;
  deleteTweet(tweetId: number): Promise<TweetModel>;
}
