import express from 'express';
import {
  createTweet,
  deleteTweet,
  getTweetById,
  getTweets,
  updateTweet,
} from '../controller/tweet.controller';
import { tweetValidator } from '../middleware/validator/tweet.validator';
import { isAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', isAuth, getTweets);

router.get('/:id', isAuth, getTweetById);

router.post('/', isAuth, tweetValidator, createTweet);

router.put('/:id', isAuth, tweetValidator, updateTweet);

router.delete('/:id', isAuth, deleteTweet);

export default router;
