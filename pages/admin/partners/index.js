import React from "react";
import { useTranslation } from "react-i18next";
import { usePartnersInfo } from "hooks/usePartnerInfo";
import NewItemLink from "components/admin-page/common/new-item-link";

import Layout from "components/admin-page/common/layout";
import PartnersList from "components/admin-page/our-partners";
import { AuthProvider } from "context/auth-provider";

function PartnerPage() {
  const { data } = usePartnersInfo();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const withTranslations = data?.map(
    ({ translations, _id, is_active, link }) => ({
      _id,
      is_active,
      link,
      ...translations[language],
    })
  );

  return (
    <AuthProvider>
      <Layout>
        <NewItemLink path={"partners/new-partner"}> Додати</NewItemLink>

        <PartnersList partners={withTranslations} />
      </Layout>{" "}
    </AuthProvider>
  );
}

export default PartnerPage;
