import { tweets } from '../data/mock_tweets';
import { Request, Response } from 'express';
import TweetService from '../service/tweet.service';
import { TweetModel } from '../model/tweet.model';

const tweetService = new TweetService(tweets);

const getTweets = async (req: Request, res: Response) => {
  const username = req.query.username;
  if (typeof username !== 'string') {
    return res.status(403);
  }
  const result = await (username
    ? tweetService.getTweetsByUsername(username)
    : tweetService.getTweets());
  res.status(200).json(result);
};

const getTweetById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const tweet = await tweetService.getTweetById(parseInt(id));
  console.log(tweet);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  console.log(tweet);
  res.status(200).json(tweet);
};

const createTweet = async (req: Request, res: Response) => {
  const { text, name, username } = req.body;
  const tweets = await tweetService.getTweets();
  const tweet: TweetModel = {
    id: tweets.length + 1,
    text,
    createdAt: new Date(),
    user: {
      name,
      username,
    },
  };
  await tweetService.createTweet(tweet);
  res.status(201).json(tweet);
};

const updateTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const text: string = req.body.text;
  const updatedId = await tweetService.updateTweet(parseInt(id), text);

  if (!updatedId) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }

  res.status(200).json({ id });
};

const deleteTweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedId = await tweetService.deleteTweet(parseInt(id));

  if (!deletedId) {
    return res.status(404).json({ message: `Tweet id(${id}) is not found` });
  }
  res.status(200).json({ id });
};

export { getTweets, getTweetById, createTweet, updateTweet, deleteTweet };
