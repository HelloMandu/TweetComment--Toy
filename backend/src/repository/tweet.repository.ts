import { TweetRepositoryInterface, TweetModel } from '../model/tweet.model';

class TweetRepository implements TweetRepositoryInterface {
  tweets: TweetModel[];

  constructor(tweets: TweetModel[]) {
    this.tweets = tweets;
  }

  private hasTweet(id: string): boolean {
    return this.tweets.some((tweet) => tweet.id === id);
  }

  async getTweets(): Promise<TweetModel[]> {
    return this.tweets;
  }

  async getTweetById(id: string): Promise<TweetModel | undefined> {
    return this.tweets.find((tweet) => tweet.id === id);
  }

  async getTweetsByUsername(username: string): Promise<TweetModel[]> {
    // return this.tweets.filter((tweet) => tweet.user.username === username) ?? [];
    return [];
  }

  async createTweet(newTweet: TweetModel): Promise<void> {
    this.tweets.push(newTweet);
  }

  async updateTweet(id: string, text: string): Promise<TweetModel | undefined> {
    if (!this.hasTweet(id)) {
      return;
    }
    this.tweets = this.tweets.map((tweet) => (tweet.id === id ? { ...tweet, text } : tweet));
    return this.tweets.find((tweet) => tweet.id === id);
  }

  async deleteTweet(id: string): Promise<TweetModel | undefined> {
    if (!this.hasTweet(id)) {
      return;
    }
    const prevDeleteTweets = [...this.tweets];
    this.tweets = this.tweets.filter((tweet) => tweet.id !== id);
    return prevDeleteTweets.find((tweet) => tweet.id === id);
  }
}

export default TweetRepository;
