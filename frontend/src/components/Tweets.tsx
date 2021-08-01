import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from './Banner';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import { useAuth } from '../context/AuthContext';
import { TweetModel } from '../model';
import TweetService from '../service/tweet.service';
import { log } from 'util';

interface TweetsProps {
  tweetService: TweetService;
  username?: string;
  addable: boolean;
}

const Tweets = memo(({ tweetService, username, addable }: TweetsProps) => {
  const [tweets, setTweets] = useState<TweetModel[]>([]);
  const [error, setError] = useState<string>('');
  const history = useHistory();
  // const { user } = useAuth();

  useEffect(() => {
    tweetService
      .getTweets(username)
      .then((tweets: TweetModel[]) => {
        console.log(tweets);
        setTweets([...tweets]);
      })
      .catch(onError);
  }, [tweetService, username]); // user dependency exists

  const onCreated = (tweet: TweetModel) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId: number) =>
    tweetService
      .deleteTweet(tweetId)
      .then(() => setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId)))
      .catch((error) => setError(error.toString()));

  const onUpdate = (tweetId: number, text: string) =>
    tweetService
      .updateTweet(tweetId, text)
      .then((updated: TweetModel) =>
        setTweets((tweets) => tweets.map((item) => (item.id === updated.id ? updated : item)))
      )
      .catch((error: Error) => error.toString());

  const onUsernameClick = (tweet: TweetModel) => history.push(`/${tweet.user.username}`);

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
      {/*{error && <Banner text={error} isAlert={true} transient={true} />}*/}
      {tweets.length === 0 && <p className="tweets-empty">No Tweets Yet</p>}
      <ul className="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            // owner={tweet.user.username === user.user.username}
            owner={true}
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
