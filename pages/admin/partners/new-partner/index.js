import React from "react";
import Layout from "components/admin-page/common/layout";
import NewPartnerForm from "components/admin-page/our-partners/new-partner";
import { AuthProvider } from "context/auth-provider";

const NewPartner = () => {
  return (
    <AuthProvider>
    <Layout>
      <NewPartnerForm />
    </Layout>
    </AuthProvider>
  );
};

export default NewPartner ;
