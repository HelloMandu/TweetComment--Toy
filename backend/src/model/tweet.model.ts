export type TweetModel = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

export interface TweetRepositoryInterface {
  tweets: TweetModel[];
  getTweets(): Promise<TweetModel[]>;
  getTweetById(id: string): Promise<TweetModel | undefined>;
  getTweetsByUsername(username: string): Promise<TweetModel[]>;
  createTweet(newTweet: TweetModel): Promise<void>;
  updateTweet(id: string, text: string): Promise<TweetModel | undefined>;
  deleteTweet(id: string): Promise<TweetModel | undefined>;
}
