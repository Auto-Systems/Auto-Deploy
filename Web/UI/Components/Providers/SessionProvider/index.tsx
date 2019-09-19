// UI/UI/Components/Providers/SessionProvider/index.tsx
// KristianFJones <me@kristianjones.xyz>
import React, { createContext, useContext, FunctionComponent, useEffect, useRef } from 'react';
import { useUserCheckQuery } from './isAuthed.gen';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen'
import { useLoginMutation } from './login.gen';
import { useCookies } from 'react-cookie';
import { MutationResult } from '@apollo/react-common';

export interface Session {
  isAuthed: boolean;
  role: UserRole[];
}

const SessionContext = createContext<Session>({
  isAuthed: false,
  role: [UserRole.Guest]
});

type useIsAuthedType = () => { isAuthed: boolean; role: UserRole[] };

export const useToken = (): [string, setToken, deleteToken] => {
  const [token, setCookieToken, deleteCookieToken] = useCookies();
  const setToken = (token?: string): void => setCookieToken('token', token, { path: '/' });
  const deleteToken = (): void => deleteCookieToken('token');
  return [token['token'], setToken, deleteToken];
};

export const useIsAuthed: useIsAuthedType = () => {
  const [token] = useToken();
  const { data, refetch } = useUserCheckQuery()
  const isAuthed = data && data.userCheck ? data.userCheck.isAuthed : false;
  const role =  data && data.userCheck ? data.userCheck.role : [UserRole.Guest]
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (typeof refetch === 'function') refetch();
  }, [token]);
  return { isAuthed, role: role };
};

const SessionProvider: FunctionComponent = ({ children }) => {
  const sessionValue = useIsAuthed();
  return <SessionContext.Provider value={sessionValue}>{children}</SessionContext.Provider>;
};

export default SessionProvider;

export const useSession = (): Session => {
  return useContext(SessionContext);
};

interface User {
  username: string;
  password: string;
}

type LoginType = (user: User) => Promise<boolean>;

type setToken = (token?: string) => void;
type deleteToken = () => void;

export const useLogin = (): [LoginType, MutationResult] => {
  const [, setToken] = useToken();
  const [loginUser, { ...extra }] = useLoginMutation()
  const LoginFN: LoginType = async (input) => {
    const response = await loginUser({ variables: { input } });
    if (response && response.data && response.data.login.success) {
      setToken(response.data.login.token);
      return true;
    } else return false;
  };
  return [LoginFN, { ...extra }];
};

export const useLogout = (): [() => Promise<void>] => {
  const [, , deleteToken] = useToken();
  const LogoutFN = async (): Promise<void> => deleteToken();
  return [LogoutFN];
};
