import React from "react";
import { useTestimonials } from "hooks/useTestimonials";

import Link from "components/admin-page/common/link";


import Table from "components/admin-page/common/table";
import Button from "components/admin-page/common/button";
import Toggle from "react-toggle";
const defaultPhrase = "Переклад Відсутній";

const TestimonialsList = (props) => {
  const {testimonials } = props;
  const {update,remove, } =  useTestimonials();




  const columns = React.useMemo(
    () => [
      {
        Header: "Автор",
        accessor: `title`, // accessor is the "key" in the data
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
      {
        Header: "Дата добавлення",
        accessor: "date",
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
               update({ _id: row.original._id, is_active: e.target.checked });
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
            <Link path={`testimonials/edit-testimonial/${row.original._id}`}>
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
                remove(row.original._id);
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

  return <Table data={testimonials || []} columns={columns} />;
};

export default  TestimonialsList;
