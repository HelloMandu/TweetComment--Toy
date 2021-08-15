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

router.post('/', tweetValidator, isAuth, createTweet);

router.put('/:id', tweetValidator, isAuth, updateTweet);

router.delete('/:id', tweetValidator, isAuth, deleteTweet);

export default router;
