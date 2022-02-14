import React from "react";
import { useUser } from "context/auth-provider";
import LoginForm from "./form";
import { useRouter } from "next/router";

const Login = () => {
  const { user, loginUser, isLoading, isFetched } = useUser();
  const router = useRouter();

  if (user && isFetched) {
    router.push("/admin");
  }

  const onSubmit = (data) => {
    loginUser(data);
  };
  return <LoginForm onSubmit={onSubmit} isLoading={false} />;
};

export default Login;
