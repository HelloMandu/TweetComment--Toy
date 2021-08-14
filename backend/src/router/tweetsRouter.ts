import express from 'express';
import {
  createTweet,
  deleteTweet,
  getTweetById,
  getTweets,
  updateTweet,
} from '../controller/tweet.controller';
import { tweetValidator } from '../middleware/validator/tweet.validator';

const router = express.Router();

router.get('/', getTweets);

router.get('/:id', getTweetById);

router.post('/', tweetValidator, createTweet);

router.put('/:id', tweetValidator, updateTweet);

router.delete('/:id', tweetValidator, deleteTweet);

export default router;
