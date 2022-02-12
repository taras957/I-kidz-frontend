import axios, { Method } from 'axios';
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
  headers?: Object;
  isBlob?: boolean;
}

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
  return axios
    .request<T>(config)
    .then((response) => {
      // if (response.status === 401) {
      //   queryCache.clear()
      //   await auth.logout()
      //   // refresh the page for them
      //   window.location.assign(window.location)
      //   return Promise.reject({message: 'Please re-authenticate.'})
      // }
      return response;
    })
    .catch((e: unknown) => {
      throw new Error(e.message);
      // if (typeof e === 'string') {
      //   e.toUpperCase();
      // } else if (e instanceof Error) {
      //   e.message;
      // }
    });
}
export { client };
