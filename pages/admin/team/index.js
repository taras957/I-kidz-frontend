import React from "react";
import { useTranslation } from "react-i18next";
import { useTeamPersons } from "hooks/useTeamPersons";
import NewItemLink from "components/admin-page/common/new-item-link";

import Layout from "components/admin-page/common/layout";
import TeamList from "components/admin-page/our-team";
import { AuthProvider } from "context/auth-provider";

const Team = () => {
  const { data } = useTeamPersons();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const withTranslations = data?.map(({ translations, _id, is_active }) => ({
    _id,
    is_active,
    ...translations[language],
  }));

  return (
    <AuthProvider>
      <Layout>
        <NewItemLink path={"team/new-person"}> Додати</NewItemLink>

        <TeamList persons={withTranslations} />
      </Layout>{" "}
    </AuthProvider>
  );
};

export default Team;
