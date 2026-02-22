'use client';

import { useRouter } from 'next/navigation';
import { type FC, useCallback, useState } from 'react';
import { useAuthContext } from '@/auth/auth.context';
import { LoginForm } from './login-form';

export const LoginPage: FC = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string>();
  const { push: navigate } = useRouter();

  const onLogin = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const error = await login(username, password);
      if (error) {
        setError(error);
        return false;
      }
      navigate('/profile');
      return true;
    },
    [navigate, login]
  );

  return <LoginForm errorMessage={error} onLogin={onLogin} />;
};
