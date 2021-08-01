export type TweetType = {
  id: number;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  url?: string;
};

export interface TweetInterface {
  getTweets(username?: string): Promise<TweetType | TweetType[]>;
  postTweet(text: string): Promise<TweetType>;
  updateTweet(tweetId: number, text: string): Promise<TweetType>;
  deleteTweet(tweetId: number): Promise<TweetType>;
}
