import React from "react";
import UpdatePartner from "components/admin-page/our-partners/edit-partner";
import Layout from "components/admin-page/common/layout";
import { AuthProvider } from "context/auth-provider";

const UpdatePartnerInfo = () => {
  return (
    <AuthProvider>
    <Layout>
      <UpdatePartner />
    </Layout>
    </AuthProvider>
  );
};

export default UpdatePartnerInfo;
