import React from "react";
import { client } from "utils/api-client";
const AuthContext = React.createContext();
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { userQuery } from "queries";

const localStorageKey = "token";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}
async function setToken(token) {
  return window.localStorage.setItem(localStorageKey, token);
}

async function getUser() {
  let user = null;
  let userToken = null;

  const token = await getToken();
  if (token) {
    const { data } = await client("/get-user", { token });

    user = data?.user;
    userToken = data?.token;
  }
  return {user, token:userToken};
}

async function login(userCredentials) {
  let user = null;

  const { data } = await client("/login", {
    data: userCredentials,

  });
  const { token } = data;

  await setToken(token);

  user = data;
  return data.user;
}
// const tenMinutes = 600000;
export const AuthProvider = ({ children }) => {
  const { data, isLoading, isFetched, isIdle, isFetching } = useQuery(
    userQuery,
    getUser,
    {
      // cacheTime: tenMinutes,
      // staleTime: tenMinutes / 3,
      // refetchOnWindowFocus: false,
    }
  );
  const router = useRouter();

  const queryClient = useQueryClient();


  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { mutate: loginUser } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(userQuery);
    },
  });

  const value = React.useMemo(
    () => ({ user: data?.user,token:data?.token, loginUser,  isLoading, isFetched }),
    [data, isLoading]
  );
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (!data && isFetched && router.pathname !== "/login") {
    router.push("/login");
    return <div>Loading</div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUser = () => {
  const user = React.useContext(AuthContext);
  // const value = React.useMemo(() => ({ user, loginUser, isLoading }), []);
console.log(user,'user23423432')
  return user;
};
