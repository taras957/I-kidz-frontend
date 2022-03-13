import React from 'react';

import Table from 'components/admin-page/common/table';
import { useTeamColumns } from 'components/admin-page/our-team/team.config';
import { iTeamMember } from 'api/team-person/interfaces/team-member';

const TeamList = (props: { persons: iTeamMember[] }) => {
  const { persons } = props;
  const columns = useTeamColumns();
  return <Table data={persons || []} columns={columns} />;
};

export default TeamList;
