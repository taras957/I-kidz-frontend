import React from "react";
import Layout from "components/admin-page/common/layout";
import NewPersonForm from "components/admin-page/our-team/new-person-form";
import { AuthProvider } from "context/auth-provider";


const NewPerson = () => {
  return (
<AuthProvider>
    <Layout>
      <NewPersonForm />
    </Layout>
    </AuthProvider>
  );
};

export default NewPerson;
