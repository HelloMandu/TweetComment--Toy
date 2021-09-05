import { UserModel } from './user.model';

export type TweetModel = {
  id: number;
  text: string;
  createdAt: Date;
  userId: string;
};

export type TweetResult = {
  tweet: TweetModel;
  user: UserModel;
};

export interface TweetInterface {
  getTweets(username?: string): Promise<TweetResult[]>;
  getTweetsById(id: number): Promise<TweetResult>;
  createTweet(text: string, username: string, user: string): Promise<TweetResult>;
  updateTweet(tweetId: number, text: string): Promise<TweetResult>;
  deleteTweet(tweetId: number): Promise<TweetModel>;
  onSync(event: string, listener: Function): void;
}
