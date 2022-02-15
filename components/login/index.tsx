import React from 'react';
import { useUser } from 'context/auth-provider';
import LoginForm from './form';
import { useRouter } from 'next/router';

const Login = () => {
  const { user, loginUser, isFetched } = useUser();
  const router = useRouter();

  if (user && isFetched) {
    router.push('/admin');
  }

  const onSubmit = (data: { email: string; password: string }) => {
    loginUser(data);
  };
  return <LoginForm onSubmit={onSubmit} isLoading={false} />;
};

export default Login;
