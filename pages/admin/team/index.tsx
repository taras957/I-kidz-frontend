import React from 'react';
import NewItemLink from 'components/admin-page/common/new-item-link';
import Layout from 'components/admin-page/common/layout';
import TeamList from 'components/admin-page/our-team';
import { AuthProvider } from 'context/auth-provider';
import { useTeamMemberWithTranslation } from 'domain/team-person/data-mappers/team-members-translation';

const Team = () => {
  const data = useTeamMemberWithTranslation();

  return (
    <AuthProvider>
      <Layout>
        <NewItemLink path={'team/new-person'}>Додати</NewItemLink>
        <TeamList persons={data} />
      </Layout>
    </AuthProvider>
  );
};

export default Team;
