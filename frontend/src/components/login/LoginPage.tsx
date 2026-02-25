'use client';

import { useRouter } from 'next/navigation';
import { type FC, useCallback, useState } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import { LoginForm } from './LoginForm';

export const LoginPage: FC = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string>();
  const { push: navigate } = useRouter();

  const onLogin = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setError('');
      try {
        await login(username, password);
        navigate('/');
        return true;
      } catch {
        setError('Hibás felhasználónév vagy jelszó');
        return false;
      }
    },
    [navigate, login]
  );

  return <LoginForm errorMessage={error} onLogin={onLogin} />;
};
