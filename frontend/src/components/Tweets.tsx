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

  useEffect(() => {
    tweetService
      .getTweets(username)
      .then((tweets) => {
        setTweets(tweets);
      })
      .catch(onError);
  }, [tweetService, username]);

  const onCreated = (tweet: TweetResult) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId: number) =>
    tweetService
      .deleteTweet(tweetId)
      .then(() => setTweets((tweets) => tweets.filter((tweet) => tweet.tweet.id !== tweetId)))
      .catch((error) => setError(error.toString()));

  const onUpdate = (tweetId: number, text: string) =>
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) =>
        setTweets((tweets) =>
          tweets.map((item) => (item.tweet.id === updated.tweet.id ? updated : item))
        )
      )
      .catch((error: Error) => error.toString());

  const onUsernameClick = (username: string) => history.push(`/${username}`);

  const onError = (error: Error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewTweetForm tweetService={tweetService} onError={onError} onCreated={onCreated} />
      )}
      {error && <Banner text={error} isAlert />}
      {tweets.length === 0 && <p className="tweets-empty">No Tweets Yet</p>}
      <ul className="tweets">
        {tweets.map((tweetItem) => (
          <TweetCard
            key={tweetItem.tweet.id}
            tweet={tweetItem.tweet}
            user={tweetItem.user}
            owner={tweetItem.user?.username === user?.username}
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
