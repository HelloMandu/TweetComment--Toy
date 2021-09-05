import express, { Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweet.router';
import authRouter from './router/auth.router';
import { config } from './config';
import Socket from './connection/socket';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((_: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((error, _: Request, res: Response) => {
  console.error(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port, () => {
  console.log('Start Server');
});
Socket.getInstance(server);
