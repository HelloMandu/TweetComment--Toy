export type TweetModel = {
  id: number;
  text: string;
  createdAt: Date;
  userId: number;
};

export interface TweetRepositoryInterface {
  tweets: TweetModel[];
  getTweets(): Promise<TweetModel[]>;
  getTweetById(id: number): Promise<TweetModel | undefined>;
  getTweetsByUsername(username: string): Promise<TweetModel[]>;
  createTweet(newTweet: TweetModel): Promise<void>;
  updateTweet(id: number, text: string): Promise<TweetModel | undefined>;
  deleteTweet(id: number): Promise<TweetModel | undefined>;
}
