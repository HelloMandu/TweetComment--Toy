import socket, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface SocketClientInterface {
  onSync(event: string, listener: Function): () => void;
}

export default class SocketClient implements SocketClientInterface {
  private readonly socketIO: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(baseURL: string, getToken: () => string) {
    this.socketIO = socket(baseURL, {
      auth: (callback) => callback({ token: getToken() }),
    });

    this.socketIO.on('connect_error', (err) => {
      console.log('socket error', err);
    });
  }

  onSync(event: string, listener: Function) {
    if (!this.socketIO.connected) {
      this.socketIO.connect();
    }
    this.socketIO.on(event, (e) => listener(e));
    return () => this.socketIO.off(event);
  }
}
