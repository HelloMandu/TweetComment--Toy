import express from 'express';
import TweetController from '../controller/tweet.controller';
import { tweetValidator } from '../middleware/validator/tweet.validator';
import { isAuth } from '../middleware/auth';
import TweetRepository from '../repository/tweet.repository';
import { mock_tweets } from '../data/mock_tweets';
import UserRepository from '../repository/user.repository';
import { mock_users } from '../data/mock_users';

const router = express.Router();
const tweetController = new TweetController({
  tweetRepository: new TweetRepository(mock_tweets),
  userRepository: new UserRepository(mock_users)
});

router.get('/', isAuth, tweetController.getTweets.bind(tweetController));

router.get('/:id', isAuth, tweetController.getTweetById.bind(tweetController));

router.post('/', isAuth, tweetValidator, tweetController.createTweet.bind(tweetController));

router.put('/:id', isAuth, tweetValidator, tweetController.updateTweet.bind(tweetController));

router.delete('/:id', isAuth, tweetController.deleteTweet.bind(tweetController));

export default router;
