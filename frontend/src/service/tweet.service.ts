import { HttpClientInterface, TweetInterface, TweetType } from '../model';

export default class TweetService implements TweetInterface {
  httpClient: HttpClientInterface;
  tweets: TweetType[] = [
    {
      id: 1,
      text: '실시간 tweet을 구현해보자. 바닥부터',
      createdAt: new Date('2021-05-09T04:20:57.000Z'),
      user: {
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
      },
    },
  ];

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient;
  }

  async getTweets(username?: string) {
    const usernameUrl = username ? `/username=${username}` : '';
    this.tweets = await this.httpClient.get(`/tweets${usernameUrl}`);
    return username ? this.tweets.filter((tweet) => tweet.user.username === username) : this.tweets;
  }

  async postTweet(text: string) {
    const tweet: TweetType = {
      id: Date.now(),
      createdAt: new Date(),
      text,
      user: {
        name: 'Ellie',
        username: 'ellie',
      },
    };
    this.tweets.push(tweet);
    return tweet;
  }

  async updateTweet(tweetId: number, text: string) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    return tweet;
  }

  async deleteTweet(tweetId: number) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    return {
      id: Date.now(),
      createdAt: new Date(),
      text: 'test',
      user: {
        name: 'Ellie',
        username: 'ellie',
      },
    };
  }
}
