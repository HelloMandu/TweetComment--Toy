import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { config } from '../config';
import http from 'http';

class Socket {
  private static instance: Socket;
  private readonly socketIO: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

  private constructor(server: http.Server) {
    this.socketIO = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.socketIO.use((socket, next) => {
      const token: string | undefined = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication Error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error) => {
        if (error) {
          return next(new Error('Authentication Error'));
        }
        next();
      });
    });
  }

  get io(): Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap> {
    return this.socketIO;
  }

  static getInstance(server: http.Server): Socket {
    if (!this.instance) {
      this.instance = new Socket(server);
    }
    return this.instance;
  }
}

export default Socket;
