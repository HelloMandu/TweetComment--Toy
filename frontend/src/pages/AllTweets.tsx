import React from 'react';
import Tweets from '../components/Tweets';
import { TweetInterface } from '../model';

interface AllTweetsProps {
  tweetService: TweetInterface;
}

const AllTweets = ({ tweetService }: AllTweetsProps) => (
  <Tweets tweetService={tweetService} addable={true} />
);

export default AllTweets;
