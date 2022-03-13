import { usePartnerMethods } from 'domain/partner/data';
import React from 'react';
import { CellProps, Column } from 'react-table';
import Toggle from 'react-toggle';
import { PartnerItem } from '.';
import Button from 'components/admin-page/common/button';
import CustomLink from '../common/link';

type TPartnerItemCols = keyof PartnerItem;

export function usePartnerColumns() {
  const { updatePartnerInfo, removePartnerInfo } = usePartnerMethods();
  const columns: Column<PartnerItem>[] = React.useMemo(
    () => [
      {
        Header: "Ім 'я",
        accessor: 'title',
        Cell: ({ row, column }: CellProps<PartnerItem>) => {
          const columnId = column.id as TPartnerItemCols;
          return row.original[columnId];
        },
      },
      {
        Header: 'Посилання',
        accessor: `link`,
        Cell: ({ row, column }: CellProps<PartnerItem>) => {
          const columnId = column.id as TPartnerItemCols;
          return row.original[columnId] || 'n/a';
        },
      },

      {
        Header: 'Активний',
        accessor: 'isActive',
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
        accessor: 'id',
        Cell: ({ row }: CellProps<PartnerItem>) => {
          return (
            <CustomLink path={`partners/edit-partner-info/${row.original.id}`}>
              <Button>Edit</Button>
            </CustomLink>
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

  return columns;
}
