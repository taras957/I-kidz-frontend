import React from 'react';

import NewItemLink from 'components/admin-page/common/new-item-link';

import Layout from 'components/admin-page/common/layout';
import PartnersList from 'components/admin-page/our-partners';
import { AuthProvider } from 'context/auth-provider';
import { usePartnerTranslation } from 'api/partner/data-mappers/partner-with-translation';

function PartnerPage() {
  const withTranslations = usePartnerTranslation();
  console.log(withTranslations, 'withTranslations');
  return (
    <AuthProvider>
      <Layout>
        <NewItemLink path={'partners/new-partner'}> Додати</NewItemLink>
        <PartnersList partners={withTranslations} />
      </Layout>
    </AuthProvider>
  );
}

export default PartnerPage;
