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

const tokenService = new TokenService();
const httpClient = new HttpClientService(tokenService);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenService);
const tweetService = new TweetService(httpClient);
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
