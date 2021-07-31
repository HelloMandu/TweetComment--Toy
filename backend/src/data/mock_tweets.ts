import { TweetModel } from '../model/tweet.model';

export const tweets: TweetModel[] = [
  {
    id: 1,
    text: 'first tweet',
    createdAt: new Date(),
    user: {
      name: 'sungmin',
      username: 'sungmin',
      url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
    },
  },
  {
    id: 2,
    text: 'second tweet',
    createdAt: new Date(),
    user: {
      name: 'sungmin2',
      username: 'sungmin2',
      url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
    },
  },
];
