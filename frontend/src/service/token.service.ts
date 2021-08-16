import { TokenServiceInterface } from '../model/auth.model';

export default class TokenService implements TokenServiceInterface {
  private KEY = 'TOKEN';

  get getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  set setToken(token: string) {
    localStorage.setItem(this.KEY, token);
  }

  deleteToken(): void {
    localStorage.removeItem(this.KEY);
  }
}
