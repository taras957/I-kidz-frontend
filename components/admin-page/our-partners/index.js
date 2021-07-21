import React from "react";
import Link from "components/admin-page/common/link";

import { usePartnersInfo } from "hooks/usePartnerInfo";

import Table from "components/admin-page/common/table";
import Button from "components/admin-page/common/button";
import Toggle from "react-toggle";
const defaultPhrase = "Переклад Відсутній";

const PartnersList = (props) => {
  const { partners } = props;

  const { updatePartnerInfo,removePartnerInfo } =  usePartnersInfo();




  const columns = React.useMemo(
    () => [
      {
        Header: "Ім 'я",
        accessor: `title`, 
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      }, {
        Header: "Посилання",
        accessor: `link`, 
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
     
      {
        Header: "Активний",
        accessor: "is_active",
        Cell: ({ row }) => {
          return (
            <Toggle
            className={'toggle-center'}
              checked={row.original.is_active}
              name="burritoIsReady"
              onChange={(e) => {
                updatePartnerInfo({ _id: row.original._id, is_active: e.target.checked });
              }}
            />
          );
        },
      },
      {
        Header: "Редагувати",
        accessor: "_id",
        Cell: ({ row }) => {
          return (
            <Link path={`partners/edit-partner-info/${row.original._id}`}>
              <Button>Edit</Button>
            </Link>
          );
        },
      },
      {
        Header: "Видалити",
        accessor: " ",
        Cell: ({ row }) => {
          return (
            <Button
              onClick={() => {
                removePartnerInfo(row.original._id);
              }}
              color={"#D23F31"}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    []
  );

  return <Table data={partners || []} columns={columns} />;
};

export default PartnersList;
