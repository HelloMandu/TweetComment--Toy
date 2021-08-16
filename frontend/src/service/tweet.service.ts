import { HttpClientInterface, TweetInterface, TweetModel } from '../model';
import { TokenServiceInterface } from '../model/auth.model';

export default class TweetService implements TweetInterface {
  httpClient: HttpClientInterface;
  tokenService: TokenServiceInterface;
  tweets: TweetModel[];

  constructor(httpClient: HttpClientInterface, tokenService: TokenServiceInterface) {
    this.httpClient = httpClient;
    this.tweets = [];
    this.tokenService = tokenService;
  }

  async getTweets(username?: string) {
    const usernameUrl = username ? `/username=${username}` : '';
    const token = this.tokenService.getToken;
    this.tweets = await this.httpClient.get(`/tweets${usernameUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return username ? this.tweets.filter((tweet) => tweet.user.username === username) : this.tweets;
  }

  async getTweetsById(id: number) {
    const token = this.tokenService.getToken;
    return this.httpClient.get<TweetModel>(`/tweets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createTweet(text: string, username: string, user: string) {
    const token = this.tokenService.getToken;
    console.log(token);
    return this.httpClient.post<TweetModel>(`/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        username,
        user,
      }),
    });
  }

  async updateTweet(tweetId: number, text: string) {
    const token = this.tokenService.getToken;
    return this.httpClient.put<TweetModel>(`/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId: number) {
    const token = this.tokenService.getToken;
    return this.httpClient.delete<TweetModel>(`/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
