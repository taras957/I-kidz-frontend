import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { siteInfo } from "queries";

import CoursesList from "components/admin-page/courses";

import { dehydrate } from "react-query/hydration";

import { useQuery, QueryClient } from "react-query";
import { client } from "utils/api-client";
import Layout from "components/admin-page/common/layout";
import NewCourseLink from "components/admin-page/courses/new-course-link";
import Box from "components/layout/box";
import { getSorted } from "./utils";
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

const Courses = () => {
  const { data } = useQuery(siteInfo, getAdminInfo);
  const { courses } = data || { courses: [] };
  const childrenByCategoryList = getSorted(courses);
  return (
    <Layout>
      <Tabs>
        <TabList>
          <Box>
            {childrenByCategoryList.map((listItem) => {
              const [, age] = listItem;
              return <Tab>{age}</Tab>;
            })}
            <NewCourseLink />
          </Box>
        </TabList>
        {childrenByCategoryList.map((listItem) => {
          const [category] = listItem;
          const coursesByCategory = data?.courses.filter(
            (course) => course.category === category
          );
          return (
            <TabPanel>
              <CoursesList id={data?._id} courses={coursesByCategory} />
            </TabPanel>
          );
        })}
      </Tabs>
    </Layout>
  );
};

export default Courses;
