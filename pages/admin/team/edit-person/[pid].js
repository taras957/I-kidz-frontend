import React from "react";
import Layout from "components/admin-page/common/layout";
import NewPersonForm from "components/admin-page/our-team/edit-person-form";
import { AuthProvider } from "context/auth-provider";

const EditPerson = () => {
  return (
    <AuthProvider>
    <Layout>
      <NewPersonForm />
    </Layout>
    </AuthProvider>
  );
};

export default EditPerson;
