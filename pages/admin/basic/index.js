import React from "react";
import { siteInfo } from "queries";
import { useRouter } from "next/router";

import GeneralInfoForm from "components/admin-page/general-info";

import { dehydrate } from "react-query/hydration";
import { useUser } from "context/auth-provider";
import { useQuery, QueryClient } from "react-query";
import { client } from "utils/api-client";
import Layout from "components/admin-page/common/layout";
import { AuthProvider } from "context/auth-provider";

const getAdminInfo = async () => {
  const res = await client("/home");
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

const Basic = (props) => {
  const { data } = useQuery(siteInfo, getAdminInfo);

  return (
    <AuthProvider>
      <Layout>
        <GeneralInfoForm
          id={data?._id}
          hero={data?.hero}
          contacts={data?.contacts}
        />
      </Layout>
    </AuthProvider>
  );
};

export default Basic;
