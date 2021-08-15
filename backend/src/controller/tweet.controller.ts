import { mock_tweets } from '../data/mock_tweets';
import { Request, Response } from 'express';
import TweetRepository from '../repository/tweet.repository';
import { TweetModel } from '../model/tweet.model';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';

const tweetRepository = new TweetRepository(mock_tweets);
const userRepository = new UserRepository(mock_users);

const getTweets = async (req: Request, res: Response) => {
  const username = req.query.username;
  if (username && typeof username !== 'string') {
    return res.status(403).json({ message: 'username is invalid' });
  }

  const user = await (username && userRepository.findByUsername(username));
  if (username && !user) {
    return res.status(403).json({ message: 'username is invalid' });
  }

  const tweets = await (user
    ? tweetRepository
        .getTweets()
        .then((tweets) => tweets.filter((tweet) => tweet.userId === user.id))
    : tweetRepository.getTweets());
  res.status(200).json(tweets ?? []);
};

const getTweetById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const tweet = await tweetRepository.getTweetById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  res.status(200).json(tweet);
};

const createTweet = async (req: Request, res: Response) => {
  const { text } = req.body;

  const { userId } = req;
  if (!userId) {
    return res.status(404).json({ message: `User ${userId} is not found` });
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    return res.status(403).json({ message: 'username is invalid' });
  }

  const tweets = await tweetRepository.getTweets();

  const newTweet: TweetModel = {
    id: (tweets.length + 1).toString(),
    text,
    createdAt: new Date(),
    userId,
  };

  await tweetRepository.createTweet(newTweet);
  res.status(201).json(newTweet);
};

const updateTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const text: string = req.body.text;
  const updated = await tweetRepository.updateTweet(id, text);

  if (!updated) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }

  res.status(200).json(updated);
};

const deleteTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleted = await tweetRepository.deleteTweet(id);

  if (!deleted) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  res.status(200).json(deleted);
};

export { getTweets, getTweetById, createTweet, updateTweet, deleteTweet };
