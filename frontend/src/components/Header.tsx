import React, { memo } from 'react';

interface HeaderProps {
  username: any;
  onLogout: any;
  onMyTweets: any;
  onAllTweets: any;
}

const Header = memo(({ username, onLogout, onMyTweets, onAllTweets }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="./img/logo.png" alt="Dwitter Logo" className="logo-img" />
        <h1 className="logo-name">RealTimeTweet</h1>
        {username && <span className="logo-user">@{username}</span>}
      </div>
      {username && (
        <nav className="menu">
          <button onClick={onAllTweets}>All Tweets</button>
          <button onClick={onMyTweets}>My Tweets</button>
          <button className="menu-item" onClick={onLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
});

export default Header;
