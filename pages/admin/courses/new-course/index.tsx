import React from "react";
import Layout from "components/admin-page/common/layout";
import CourseFrom from "components/admin-page/courses/new-course-form";
import { AuthProvider } from "context/auth-provider";

const NewCourse = () => {
  return (
    <AuthProvider>
    <Layout>
      <CourseFrom />
    </Layout>
    </AuthProvider>
  );
};

export default NewCourse;
