const apiURL = process.env.NEXT_PUBLIC_API
import axios from "axios";

async function client(
  endpoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    data: data ? JSON.stringify(data) : undefined,
    url:`${apiURL}/${endpoint}`,
    headers: {
    //   Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return await axios(config).then(response => {
    // if (response.status === 401) {
    //   queryCache.clear()
    //   await auth.logout()
    //   // refresh the page for them
    //   window.location.assign(window.location)
    //   return Promise.reject({message: 'Please re-authenticate.'})
    // }
   return  response
 
  }) .catch(function (error) {
    // throw new Error(error)
    return 'error'
  })
}
export {client}
