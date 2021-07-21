import React from "react";
import Login from "components/login";
import { AuthProvider } from "context/auth-provider";

const LoginPage = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};

export default LoginPage;
