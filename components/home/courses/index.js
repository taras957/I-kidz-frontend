import Card from "components/home/courses/card";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Box from "components/layout/box";
import { useHomeInfo, useCourseCategories } from "hooks/useHomePageInfo";
import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import { useTranslation } from "react-i18next";
import css from "./style.module.css";

const Courses = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const queryClient = useQueryClient();

  const projectInfo = queryClient?.getQueryData(
    projectBootstrapQuery
  );

  const { HomeInfo: data, categories } = projectInfo || {HomeInfo: [], categories:[] }
  // const { data } = useHomeInfo();
  // const { categories } = useCourseCategories();

  return (
    <section id="courses" className={css["root"]}>
      <h5 className={css["section-title"]}> {t("development.title")}</h5>
      <Tabs>
        <TabList>
          <Box>
            {categories?.map((category) => {
              const { label, value } = category[language];
              return <Tab key={value}>{label}</Tab>;
            })}
          </Box>
        </TabList>
        {categories?.map((category) => {
          const { value } = category[language];
          const coursesByCategory = data[0]?.courses
            .filter((course) => course.category === value)
            .map((course) => ({
              _id: course._id,
              is_active: course.is_active,
              path: course.path,
              ...course.translations?.[language],
            }));

          return (
            <TabPanel key={value}>
              <ul className={css["cards"]}>
                {coursesByCategory?.map((c) => {
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
