import React from 'react';
import Table from 'components/admin-page/common/table';
import {
  IPartner,
  IPartnerTranslation,
} from 'domain/partner/interfaces/partner';
import { usePartnerColumns } from './partners.config';

export type PartnerItem = Omit<IPartner, 'translations'> & IPartnerTranslation;
interface IPartnerProps {
  partners: PartnerItem[];
}

const PartnersList = (props: IPartnerProps) => {
  const { partners } = props;

  const columns = usePartnerColumns();
  return <Table<PartnerItem> data={partners} columns={columns} />;
};

export default PartnersList;
