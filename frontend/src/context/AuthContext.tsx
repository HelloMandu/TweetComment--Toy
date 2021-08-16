import {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import Header from '../components/Header';
import Login from '../pages/Login';
import { AuthServiceInterface } from '../model/auth.model';
import { UserInfo } from '../model';

const AuthContext = createContext({});

const contextRef = createRef();

interface AuthProviderProps {
  authService: AuthServiceInterface;
  authErrorEventBus: AuthErrorEventBusInterface;
}

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const [user, setUser] = useState<UserInfo>();
  const [token, setToken] = useState<string>('');

  useImperativeHandle(contextRef, () => token);

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService
      .me()
      .then(({ token, user }) => {
        setUser(user);
        setToken(token);
      })
      .catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService.signup(username, password, name, email, url).then((user) => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then(({ token, user }) => {
        setUser(user);
        setToken(token);
      }),
    [authService]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(undefined);
  }, [authService]);

  const context = useMemo(() => ({ user, signUp, logIn, logout }), [user, signUp, logIn, logout]);

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Header onLogout={logout} />
          <Login onSignUp={signUp} onLogin={logIn} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

interface AuthErrorEventBusInterface {
  listen(callback: (message: string) => void): void;
  notify(error: string): void;
}

export class AuthErrorEventBus implements AuthErrorEventBusInterface {
  private callback?: (message: string) => void;

  constructor() {
    this.callback = undefined;
  }

  listen(callback: (message: string) => void) {
    this.callback = callback;
  }
  notify(error: string) {
    this.callback?.(error);
  }
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
