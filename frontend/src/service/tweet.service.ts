import { HttpClientInterface, TweetInterface, TweetModel, TweetResult } from '../model';

export default class TweetService implements TweetInterface {
  httpClient: HttpClientInterface;
  tweets: TweetResult[];

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
    return this.httpClient.get<TweetResult>(`/tweets/${id}`);
  }

  async createTweet(text: string, username: string, user: string) {
    return this.httpClient.post<TweetResult>(`/tweets`, {
      body: JSON.stringify({
        text,
        username,
        user,
      }),
    });
  }

  async updateTweet(tweetId: number, text: string) {
    return this.httpClient.put<TweetResult>(`/tweets/${tweetId}`, {
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId: number) {
    return this.httpClient.delete<TweetModel>(`/tweets/${tweetId}`);
  }
}
