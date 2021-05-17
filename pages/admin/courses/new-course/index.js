import React from "react";
import Layout from 'components/admin-page/common/layout'
import CourseFrom from 'components/admin-page/courses/new-course-form'
import css from "./style.module.css";
const NewCourse = () => {
  return <Layout>

    <CourseFrom />
  </Layout>;
};

export default NewCourse;
