import express, { Request, Response } from 'express';
import { tweets } from '../data/mock_tweets';
import { TweetModel } from '../model/tweet.model';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const username = req.query.username;
  const result = tweets.find((tweet) => tweet.user.username === username) ?? tweets;
  res.status(200).json(result);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === parseInt(id));
  if (tweet) {
    return res.status(200).json(tweet);
  }
  res.status(404).json({ message: `Tweet id(${id}) is not found` });
});

router.post('/', (req: Request, res: Response) => {
  const { text, name, username } = req.body;
  const tweet: TweetModel = {
    id: tweets.length + 1,
    text,
    createdAt: new Date(),
    user: {
      name,
      username,
    },
  };
  tweets.push(tweet);
  res.status(201).json(tweet);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === parseInt(id));
  if (tweet) {
    tweet.text = text;
    return res.status(200).json(tweet);
  }
  res.status(404).json({ message: `Tweet id(${id}) is not found` });
});

router.delete('/:id', (req: Request, res: Response) => {
  // const id = req.params.id;
  // tweets = tweets.filter((tweet) => tweet.id !== parseInt(id));
  res.status(204);
});
export default router;
