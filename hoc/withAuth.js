import React from "react";
import { useRouter } from "next/router";

import { useUser } from "context/auth-provider";

export const withAuth = (Component) => {
  const { user, isFetched } = useUser();
  const router = useRouter();

  if (!user && isFetched) {
    router.push("/login");
  }

  return <Component />;
};

export default withAuth;
