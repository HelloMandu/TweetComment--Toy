import { Request, Response } from 'express';
import TweetRepository from '../repository/tweet.repository';
import UserRepository from '../repository/user.repository';
import { TweetModel, TweetResult } from '../model/tweet.model';

class TweetController {
  private tweetRepository: TweetRepository;
  private userRepository: UserRepository;

  constructor(args:{
    tweetRepository: TweetRepository,
    userRepository: UserRepository
  }) {
    this.tweetRepository = args.tweetRepository;
    this.userRepository = args.userRepository;
  }

  async getTweets(req: Request, res: Response) {
    const username = req.query.username;
    if (username && typeof username !== 'string') {
      return res.status(403).json({ message: 'username is invalid' });
    }

    const user = await (username && this.userRepository.findByUsername(username));
    if (username && !user) {
      return res.status(403).json({ message: 'username is invalid' });
    }

    const tweets: TweetModel[] = await (user
      ? this.tweetRepository
        .getTweets()
        .then((tweets) => tweets.filter((tweet) => tweet.userId === user.id))
      : this.tweetRepository.getTweets());

    const tweetWithUser: TweetResult[] = await Promise.all(
      tweets.map(async (tweet) => {
        const user = await this.userRepository.findById(tweet.userId);
        if (!user) {
          // TODO: 해당 부분 어떻게 해결할지 생각해볼 것
          throw Error('Can not find user');
        }
        const { name, username, url } = user;
        return { tweet, user: { name, username, url } };
      })
    );
    res.status(200).json(tweetWithUser);
  }

  async getTweetById(req: Request, res: Response) {
    const id = req.params.id;
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      return res.status(404).json({ message: `Tweet id(${id}) is not found` });
    }
    const user = await this.userRepository.findById(tweet.userId);
    if (!user) {
      throw Error('Can not find user');
    }
    res.status(200).json({ tweet, user });
  };

  async createTweet(req: Request, res: Response) {
    const { text } = req.body;
    const { userId } = req;
    if (!userId) {
      return res.status(404).json({ message: `User ${userId} is not found` });
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return res.status(403).json({ message: 'username is invalid' });
    }
    const tweets = await this.tweetRepository.getTweets();
    const newTweet: TweetModel = {
      id: (tweets.length + 1).toString(),
      text,
      createdAt: new Date(),
      userId,
    };
    await this.tweetRepository.createTweet(newTweet);
    res.status(201).json({ tweet: newTweet, user });
  };

  async updateTweet(req: Request, res: Response) {
    const id = req.params.id;
    const text: string = req.body.text;
    const updated = await this.tweetRepository.updateTweet(id, text);
    if (!updated) {
      return res.status(404).json({ message: `Tweet id(${id}) is not found` });
    }
    const user = await this.userRepository.findById(updated.userId);
    if (!user) {
      throw Error('Can not find user');
    }
    res.status(200).json({ tweet: updated, user });
  };

  async deleteTweet(req: Request, res: Response) {
    const id = req.params.id;
    const deleted = await this.tweetRepository.deleteTweet(id);
    if (!deleted) {
      return res.status(404).json({ message: `Tweet id(${id}) is not found` });
    }
    res.status(200).json(deleted);
  };
}

export default TweetController

