import express, { Request, Response } from 'express';
import { tweets } from '../data/mock_tweets';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const username = req.query.username;
  const result = tweets.find((tweet) => tweet.user.username === username) ?? tweets;
  res.status(200).json(result);
});

export default router;
