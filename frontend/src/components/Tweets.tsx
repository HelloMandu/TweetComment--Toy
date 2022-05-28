import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from './Banner';
import NewTweetForm from './NewTweetForm';
import { TweetInterface, TweetResult } from '../model';
import { useAuth } from '../context/AuthContext';
import TweetCard from './TweetCard';

interface TweetsProps {
  tweetService: TweetInterface;
  username?: string;
  addable: boolean;
}

const Tweets = memo(({ tweetService, username, addable }: TweetsProps) => {
  const [tweets, setTweets] = useState<TweetResult[]>([]);
  const [error, setError] = useState<string>('');
  const history = useHistory();
  const { user } = useAuth();


  const fetchTweets = async () =>{
    const newTweets = await tweetService.getTweets(username).catch(onError);
    if (newTweets){
      setTweets(newTweets);
    }
  }


  const onDelete = (tweetId: number) => {
    tweetService
      .deleteTweet(tweetId)
      .catch((error) => setError(error.toString()));
  }

  const onUpdate = (tweetId: number, text: string) =>{
    tweetService
      .updateTweet(tweetId, text)
      .catch((error: Error) => error.toString());
  }

  const onUsernameClick = (username: string) => history.push(`/${username}`);

  const onError = (error: Error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  useEffect(() => {
    tweetService.onSync('tweet', fetchTweets);
  }, [tweetService, username]);

  useEffect(() => {
    fetchTweets()
  }, [])

  return (
    <>
      {addable && (
        <NewTweetForm tweetService={tweetService} onError={onError} />
      )}
      {error && <Banner text={error} isAlert />}
      {!tweets.length && <p className="tweets-empty">No Tweets Yet</p>}
      <ul className="tweets">
        {tweets.map((tweetItem) => (
          <TweetCard
            key={tweetItem.tweet.id}
            tweet={tweetItem.tweet}
            user={tweetItem.user}
            owner={tweetItem.user.username === user?.username}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
});
export default Tweets;
