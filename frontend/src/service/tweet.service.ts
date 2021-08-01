import { HttpClientInterface, TweetInterface, TweetModel } from '../model';

export default class TweetService implements TweetInterface {
  httpClient: HttpClientInterface;
  tweets: TweetModel[];

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient;
    this.tweets = [];
  }

  async getTweets(username?: string) {
    const usernameUrl = username ? `/username=${username}` : '';
    this.tweets = await this.httpClient.get(`/tweets${usernameUrl}`);
    return username ? this.tweets.filter((tweet) => tweet.user.username === username) : this.tweets;
  }

  async getTweetsById(id: number) {
    return this.httpClient.get<TweetModel>(`/tweets/${id}`);
  }

  async postTweet(text: string, username: string, user: string) {
    return this.httpClient.post<TweetModel>(`/tweets`, {
      body: JSON.stringify({
        text,
        username,
        user,
      }),
    });
  }

  async updateTweet(tweetId: number, text: string) {
    const test = await this.httpClient.put<TweetModel>(`/tweets/${tweetId}`, {
      body: JSON.stringify({ text }),
    });
    console.log(test);
    return test;
  }

  async deleteTweet(tweetId: number) {
    return this.httpClient.delete<TweetModel>(`/tweets/${tweetId}`);
  }
}
