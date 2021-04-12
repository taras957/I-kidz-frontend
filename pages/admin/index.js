import React from 'react'
import axios from "axios";
 import { dehydrate } from 'react-query/hydration'

 import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
 import {client} from 'utils/api-client'
import Layout from 'components/admin-page/common/layout'
import {siteInfo} from 'queries'


const getAdminInfo = async () => {
  
 const res =   await client('/home')
 return  res.data[0]
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function  getStaticProps() {
   const queryClient = new QueryClient()

await queryClient.prefetchQuery(siteInfo,  getAdminInfo)

 // Call an external API endpoint to get posts.
  // You can use any data fetching library
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
     dehydratedState: dehydrate(queryClient),
    },
  }
}

const AdminPage =  () => {
   const data= useQuery(siteInfo, getAdminInfo)

console.log(data,'props32432');

    return (
         <Layout/ >
    )
}

export default AdminPage
