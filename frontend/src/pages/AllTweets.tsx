import React from 'react';
import Tweets from '../components/Tweets';
import TweetService from '../service/tweet.service';

interface AllTweetsProps {
  tweetService: TweetService;
}

const AllTweets = ({ tweetService }: AllTweetsProps) => (
  <Tweets tweetService={tweetService} addable={true} />
);

export default AllTweets;
