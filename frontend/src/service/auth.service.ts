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
    const { token, user } = await this.httpClient.post<Auth>('/auth/signup', {
      body: JSON.stringify({ username, password, name, email, url }),
    });
    this.tokenService.setToken = token;
    return user;
  }

  async login(username: string, password: string): Promise<Auth> {
    return this.httpClient.post('/auth/login', {
      body: JSON.stringify({ username, password }),
    });
  }

  async me(): Promise<Auth> {
    const token = this.tokenService.getToken;
    const user: UserInfo = await this.httpClient.get<UserInfo>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      token,
      user,
    };
  }

  logout() {
    this.tokenService.deleteToken();
  }
}
