import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CoursesList from 'components/admin-page/courses';

import Layout from 'components/admin-page/common/layout';
import NewItemLink from 'components/admin-page/common/new-item-link';
import Box from 'components/layout/box';
import { AuthProvider } from 'context/auth-provider';
import { useCourseTranslation } from 'api/course/data-mappers/course-with-translation-mapper';
import { useCategoryTranslation } from 'api/course-category/data-mappers/use-category-translation';

const Courses = () => {
  const categories = useCategoryTranslation();
  const courses = useCourseTranslation();

  return (
    <AuthProvider>
      <Layout>
        <Tabs>
          <TabList>
            <Box>
              {categories.map((category) => {
                const { label } = category;
                return <Tab key={label}>{label}</Tab>;
              })}
              <NewItemLink path={'courses/new-course'}>Додати курс</NewItemLink>
            </Box>
          </TabList>
          {categories.map((category) => {
            const { value } = category;
            const coursesByCategory = courses.filter(
              (course) => course.category === value
            );
            return (
              <TabPanel key={category.value}>
                <CoursesList courses={coursesByCategory} />
              </TabPanel>
            );
          })}
        </Tabs>
      </Layout>
    </AuthProvider>
  );
};

export default Courses;
