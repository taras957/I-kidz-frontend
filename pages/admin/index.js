import React from 'react';
import axios from 'axios';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { client } from 'utils/api-client';
import Layout from 'components/admin-page/common/layout';
import { siteInfo } from 'queries';
import { AuthProvider } from 'context/auth-provider';

const getAdminInfo = async () => {
  const res = await client('/home');
  return res.data[0];
};
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(siteInfo, getAdminInfo);

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
  };
}

const AdminPage = () => {
  const data = useQuery(siteInfo, getAdminInfo);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push('/admin/basic?lang=ua');
  }

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default AdminPage;
