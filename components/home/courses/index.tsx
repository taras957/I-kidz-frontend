import Card from 'components/home/courses/card';
import Box from 'components/layout/box';
import dynamic from 'next/dynamic';
import { Tab, TabList, TabPanel, TabsProps } from 'react-tabs';

import { useTranslation } from 'react-i18next';
import css from './style.module.css';
import { useHomePage } from 'hooks/useHomePage';

const Tabs = dynamic<TabsProps>(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);

const Courses = () => {
  const { t } = useTranslation();

  const { courses, categories } = useHomePage();
  return (
    <section id="courses" data-testid="courses" className={css.root}>
      <h5 className={css['section-title']}> {t('development.title')}</h5>
      <Tabs>
        <TabList>
          <Box>
            {categories.map((category) => {
              const { label, value } = category;
              return <Tab key={value}>{label}</Tab>;
            })}
          </Box>
        </TabList>
        {categories.map((category) => {
          const { value } = category;
          const coursesByCategory = courses.filter(
            (course) => course.category === value
          );

          return (
            <TabPanel key={value}>
              <ul className={css.cards}>
                {coursesByCategory.map((c) => {
                  return <Card key={c._id} course={c} />;
                })}
              </ul>
            </TabPanel>
          );
        })}
      </Tabs>
    </section>
  );
};

export default Courses;
