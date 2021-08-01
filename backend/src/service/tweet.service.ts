import { Tweet, TweetModel } from '../model/tweet.model';

class TweetService implements Tweet {
  tweets: TweetModel[];

  constructor(tweets: TweetModel[]) {
    this.tweets = tweets;
  }

  private hasTweet(id: number): boolean {
    return this.tweets.some((tweet) => tweet.id === id);
  }

  async getTweets(): Promise<TweetModel[]> {
    return this.tweets;
  }

  async getTweetById(id: number): Promise<TweetModel | undefined> {
    return this.tweets.find((tweet) => tweet.id === id);
  }

  async getTweetsByUsername(username: string): Promise<TweetModel[]> {
    return this.tweets.filter((tweet) => tweet.user.username === username) ?? [];
  }

  async createTweet(newTweet: TweetModel): Promise<void> {
    this.tweets.push(newTweet);
  }

  async updateTweet(id: number, text: string): Promise<number | null> {
    if (!this.hasTweet(id)) {
      return null;
    }
    this.tweets = this.tweets.map((tweet) => (tweet.id === id ? { ...tweet, text } : tweet));
    return id;
  }

  async deleteTweet(id: number): Promise<number | null> {
    if (!this.hasTweet(id)) {
      return null;
    }
    this.tweets = this.tweets.filter((tweet) => tweet.id !== id);
    return id;
  }
}

export default TweetService;
