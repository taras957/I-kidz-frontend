import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { useTranslation } from "react-i18next";

import CoursesList from "components/admin-page/courses";
import { useRouter } from 'next/router'

import { useHomeInfo, useCourseCategories } from "hooks/useHomePageInfo";

import Layout from "components/admin-page/common/layout";
import NewItemLink from "components/admin-page/common/new-item-link";
import Box from "components/layout/box";
import { AuthProvider } from "context/auth-provider";

const Courses = () => {
  const { data } = useHomeInfo();
  const { categories } = useCourseCategories();

  const { i18n } = useTranslation();
  const { language } = i18n;

  return (
    <AuthProvider>
      <Layout>
        <Tabs>
          <TabList>
            <Box>
              {categories?.map((category) => {
                const { label } = category[language];
                return <Tab>{label}</Tab>;
              })}
              <NewItemLink path={"courses/new-course"}>
                {" "}
                Додати курс
              </NewItemLink>
            </Box>
          </TabList>
          {categories?.map((category) => {
            const { value } = category[language];
            const coursesByCategory = data?.courses
              .filter((course) => course.category === value)
              .map((course) => ({
                _id: course._id,
                is_active: course.is_active,
                ...course.translations?.[language],
              }));

            return (
              <TabPanel>
                <CoursesList lang={language} courses={coursesByCategory} />
              </TabPanel>
            );
          })}
        </Tabs>
      </Layout>
    </AuthProvider>
  );
};

export default Courses;
