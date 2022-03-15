import axios, { Method } from 'axios';
import { getToken } from 'context/auth-provider';
const axiosInstance = axios.create();

// Interceptors
// You can intercept requests or responses before they are handled by then or catch.

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      Object.assign(config.headers, { Authorization: `Bearer ${token}` });
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const apiURL = process.env.NEXT_PUBLIC_API;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;

interface IAxiosConfig {
  method: Method;
  data: unknown;
  url: string;
  headers: unknown;
}

interface IClientOptions {
  data?: unknown;
  token?: string;
  headers?: Record<string, unknown>;
  isBlob?: boolean;
  method?: Method;
}
export const handleErrorResponse = (error) => {
  let errorResponse;
  if (error.response && error.response.data) {
    // I expect the API to handle error responses in valid format
    errorResponse = error.response.data.error;

    // JSON stringify if you need the json and use it later
  } else if (error.request) {
    // TO Handle the default error response for Network failure or 404 etc.,
    errorResponse = error.request.message || error.request.statusText;
  } else {
    errorResponse = error.message;
  }
  return errorResponse;
};
async function client<T>(
  endpoint: string,
  {
    data,
    token,
    headers: customHeaders,
    isBlob = false,
    ...customConfig
  }: IClientOptions = {}
) {
  const config: IAxiosConfig = {
    method: data ? 'POST' : 'GET',
    data: data ? (isBlob ? data : JSON.stringify(data)) : undefined,
    url: `${apiURL}/${apiPrefix}/${endpoint}`,

    headers: {
      'Content-Type': data ? 'application/json' : undefined,

      ...customHeaders,
    },
    ...customConfig,
  };

  if (token) {
    Object.assign(config.headers, { Authorization: `Bearer ${token}` });
  }
  return axiosInstance.request<T>(config);
  // .catch((e: unknown) => {
  // return handleErrorResponse(e);
  // console.log(e.toJSON(), 'error api');
  // throw new Error(e.message);
  // if (typeof e === 'string') {
  //   e.toUpperCase();
  // } else if (e instanceof Error) {
  //   e.message;
  // }
  // });
  // .then((response) => {
  //   // if (response.status === 401) {
  //   //   queryCache.clear();
  //   //   await logOut();
  //   //   // refresh the page for them
  //   //   window.location.assign(window.location);
  //   //   return Promise.reject({ message: 'Please re-authenticate.' });
  //   // }
  //   return response;
  // })
}
export { client };
