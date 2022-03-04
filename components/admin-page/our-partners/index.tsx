import React from 'react';
import Link from 'components/admin-page/common/link';

import Table from 'components/admin-page/common/table';
import Button from 'components/admin-page/common/button';
import Toggle from 'react-toggle';
import { CellProps } from 'react-table';
import { IPartner, IPartnerTranslation } from 'api/partner/interfaces/partner';
import { usePartnerMethods } from 'api/partner/data';

type PartnerItem = Omit<IPartner, 'translations'> & IPartnerTranslation;

interface IPartnerProps {
  partners: PartnerItem[];
}
type TPartnerItemCols = keyof PartnerItem;
const PartnersList = (props: IPartnerProps) => {
  const { partners } = props;

  const { updatePartnerInfo, removePartnerInfo } = usePartnerMethods();

  const columns = React.useMemo(
    () => [
      {
        Header: "Ім 'я",
        accessor: 'title' as keyof PartnerItem,
        Cell: ({ row, column }: CellProps<PartnerItem>) => {
          const columnId = column.id as TPartnerItemCols;
          return row.original[columnId];
        },
      },
      {
        Header: 'Посилання',
        accessor: `link` as TPartnerItemCols,
        Cell: ({ row, column }: CellProps<PartnerItem>) => {
          const columnId = column.id as TPartnerItemCols;
          return row.original[columnId] || 'n/a';
        },
      },

      {
        Header: 'Активний',
        accessor: 'isActive' as TPartnerItemCols,
        Cell: ({ row }: CellProps<PartnerItem>) => {
          return (
            <Toggle
              className={'toggle-center'}
              checked={row.original.isActive}
              name="burritoIsReady"
              onChange={(e) => {
                updatePartnerInfo({
                  id: row.original.id,
                  is_active: e.target.checked,
                });
              }}
            />
          );
        },
      },
      {
        Header: 'Редагувати',
        accessor: 'id' as TPartnerItemCols,
        Cell: ({ row }: CellProps<PartnerItem>) => {
          return (
            <Link path={`partners/edit-partner-info/${row.original.id}`}>
              <Button>Edit</Button>
            </Link>
          );
        },
      },
      {
        Header: 'Видалити',
        accessor: 'imgPath',
        Cell: ({ row }: CellProps<PartnerItem>) => {
          return (
            <Button
              onClick={() => {
                removePartnerInfo(row.original.id);
              }}
              color={'#D23F31'}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    []
  );

  return <Table<PartnerItem> data={partners} columns={columns} />;
};

export default PartnersList;
