import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import AuthService from './service/auth.service';
import TweetService from './service/tweet.service';
import TokenService from './service/token.service';
import HttpClientService from './service/http.service';
import SocketClient from './connection/socket';

const tokenService = new TokenService();
const httpClient = new HttpClientService(tokenService);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenService);
const tweetService = new TweetService(
  httpClient,
  new SocketClient(
    process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080',
    () => tokenService.getToken
  )
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
