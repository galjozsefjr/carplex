'use client';

import { useRouter } from 'next/navigation';
import { type FC, type PropsWithChildren, useCallback, useEffect, useEffectEvent, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { type AuthContext, AuthContextProvider, type User } from './auth.context';
import { createLoginToken, getUserProfile } from './auth.utils';

const AUTH_KEY = 'moviesApiAuthToken';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken, removeAuthToken] = useLocalStorage(AUTH_KEY, '');
  const [user, setUser] = useState<User | null>(null);
  const [inProgress, setInprogress] = useState(!!authToken);
  const { push: navigate } = useRouter();

  const login: AuthContext['login'] = useCallback(
    async (username: string, password: string) => {
      try {
        setInprogress(true);
        const authToken = await createLoginToken(username, password);
        setAuthToken(authToken);
        return null;
      } catch (error) {
        setInprogress(false);
        return (error as Error)?.message;
      }
    },
    [setAuthToken]
  );

  const logout: AuthContext['logout'] = useCallback(() => {
    removeAuthToken();
    navigate('/');
  }, [navigate, removeAuthToken]);

  const state: AuthContext = useMemo(
    () => ({
      login,
      logout,
      authToken,
      user,
      inProgress
    }),
    [login, logout, user, inProgress, authToken]
  );

  const handleUserProfile = useEffectEvent(async (authToken: string) => {
    setInprogress(true);
    try {
      const userProfile = await getUserProfile(authToken);
      setUser(userProfile);
    } catch {
      removeAuthToken();
    } finally {
      setInprogress(false);
    }
  });

  useEffect(() => {
    if (!authToken) {
      setUser(null);
      return;
    }
    handleUserProfile(authToken);
  }, [authToken]);

  return <AuthContextProvider value={state}>{children}</AuthContextProvider>;
};
