import { Auth, AuthServiceInterface, TokenServiceInterface } from '../model/auth.model';
import { HttpClientInterface, UserInfo } from '../model';

export default class AuthService implements AuthServiceInterface {
  private httpClient: HttpClientInterface;
  private tokenService: TokenServiceInterface;

  constructor(httpClient: HttpClientInterface, tokenService: TokenServiceInterface) {
    this.httpClient = httpClient;
    this.tokenService = tokenService;
  }

  async signup(
    username: string,
    password: string,
    name: string,
    email: string,
    url?: string
  ): Promise<UserInfo> {
    const { token, user } = await this.httpClient.post<{ token: string; user: UserInfo }>(
      '/auth/signup',
      {
        body: JSON.stringify({ username, password, name, email, url }),
      }
    );
    this.tokenService.setToken = token;
    return user;
  }

  async login(username: string, password: string): Promise<Auth> {
    return this.httpClient.get<Auth>('/auth/login', {
      body: JSON.stringify({ username, password }),
    });
  }

  async me() {
    // 보류
    return {
      username: 'mandu',
      token: 'temp',
    };
  }

  logout() {
    this.tokenService.deleteToken();
  }
}
