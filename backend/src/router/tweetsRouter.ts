import express from 'express';
import {
  createTweet,
  deleteTweet,
  getTweetById,
  getTweets,
  updateTweet,
} from '../controller/tweet.controller';

const router = express.Router();

router.get('/', getTweets);

router.get('/:id', getTweetById);

router.post('/', createTweet);

router.put('/:id', updateTweet);

router.delete('/:id', deleteTweet);

export default router;
