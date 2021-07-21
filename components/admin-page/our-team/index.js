import React from "react";
import { useTeamPersons } from "hooks/useTeamPersons";
import Link from "components/admin-page/common/link";


import Table from "components/admin-page/common/table";
import Button from "components/admin-page/common/button";
import Toggle from "react-toggle";
const defaultPhrase = "Переклад Відсутній";

const TeamList = (props) => {
  const { persons } = props;

  const { updatePerson, removePerson } = useTeamPersons();




  const columns = React.useMemo(
    () => [
      {
        Header: "Ім 'я",
        accessor: `title`, // accessor is the "key" in the data
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
      {
        Header: "Посада",
        accessor: "position",
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
      {
        Header: "Опис",
        accessor: "description",
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
                updatePerson({ _id: row.original._id, is_active: e.target.checked });
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
            <Link path={`team/edit-person/${row.original._id}`}>
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
                removePerson(row.original._id);
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

  return <Table data={persons || []} columns={columns} />;
};

export default TeamList;
