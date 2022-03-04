import React from "react";

import EditCourseForm from "components/admin-page/courses/edit-course-form";
import Layout from "components/admin-page/common/layout";
import { AuthProvider } from "context/auth-provider";

const EditCourse = () => {
  return (
    < AuthProvider>
    <Layout>
      <EditCourseForm />
    </Layout>
    </AuthProvider>
  );
};

export default EditCourse;
