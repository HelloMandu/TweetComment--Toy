import { UserModel } from './user.model';

export type TweetModel = {
  id: number;
  text: string;
  createdAt: Date;
  user: UserModel;
};

export interface TweetInterface {
  getTweets(username?: string): Promise<TweetModel | TweetModel[]>;
  getTweetsById(id: number): Promise<TweetModel>;
  postTweet(text: string, username: string, user: string): Promise<Pick<TweetModel, 'id'>>;
  updateTweet(tweetId: number, text: string): Promise<Pick<TweetModel, 'id'>>;
  deleteTweet(tweetId: number): Promise<Pick<TweetModel, 'id'>>;
}
