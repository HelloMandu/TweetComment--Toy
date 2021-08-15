import { tweets } from '../data/mock_tweets';
import { Request, Response } from 'express';
import TweetService from '../service/tweet.service';
import { TweetModel } from '../model/tweet.model';

const tweetService = new TweetService(tweets);

const getTweets = async (req: Request, res: Response) => {
  const username = req.query.username;
  if (username && typeof username !== 'string') {
    return res.status(403).json({ message: 'username is invalid' });
  }
  const tweets = await (username
    ? tweetService.getTweetsByUsername(username)
    : tweetService.getTweets());
  res.status(200).json(tweets ?? []);
};

const getTweetById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const tweet = await tweetService.getTweetById(parseInt(id));
  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  res.status(200).json(tweet);
};

const createTweet = async (req: Request, res: Response) => {
  const { text, name, username } = req.body;
  const tweets = await tweetService.getTweets();
  const tweet: TweetModel = {
    id: tweets.length + 1,
    text,
    createdAt: new Date(),
    // TODO: findUser
    userId: 1,
  };
  await tweetService.createTweet(tweet);
  res.status(201).json(tweet);
};

const updateTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const text: string = req.body.text;
  const updated = await tweetService.updateTweet(parseInt(id), text);

  if (!updated) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }

  res.status(200).json(updated);
};

const deleteTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleted = await tweetService.deleteTweet(parseInt(id));

  if (!deleted) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  res.status(200).json(deleted);
};

export { getTweets, getTweetById, createTweet, updateTweet, deleteTweet };
