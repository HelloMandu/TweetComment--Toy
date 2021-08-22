import { HttpClientInterface, TweetInterface, TweetModel, UserModel } from '../model';

export default class TweetService implements TweetInterface {
  httpClient: HttpClientInterface;
  tweets: { tweet: TweetModel; user?: UserModel }[];

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient;
    this.tweets = [];
  }

  async getTweets(username?: string) {
    const usernameUrl = username ? `/username=${username}` : '';
    this.tweets = await this.httpClient.get(`/tweets${usernameUrl}`);
    return username
      ? this.tweets.filter((tweet) => tweet.user?.username === username)
      : this.tweets;
  }

  async getTweetsById(id: number) {
    return this.httpClient.get<TweetModel>(`/tweets/${id}`);
  }

  async createTweet(text: string, username: string, user: string) {
    return this.httpClient.post<TweetModel>(`/tweets`, {
      body: JSON.stringify({
        text,
        username,
        user,
      }),
    });
  }

  async updateTweet(tweetId: number, text: string) {
    return this.httpClient.put<TweetModel>(`/tweets/${tweetId}`, {
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId: number) {
    return this.httpClient.delete<TweetModel>(`/tweets/${tweetId}`);
  }
}
