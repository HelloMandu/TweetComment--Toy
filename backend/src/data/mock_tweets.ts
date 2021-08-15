import { TweetModel } from '../model/tweet.model';

export const mock_tweets: TweetModel[] = [
  {
    id: '1',
    text: 'first tweet',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: '2',
    text: 'second tweet',
    createdAt: new Date(),
    userId: '1',
  },
];
