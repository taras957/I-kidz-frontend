import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { client } from "utils/api-client";
import { siteInfo } from "queries";
import Link from "components/admin-page/common/link";

const updateCourse = async ({ id, ...data }) => {
  const res = await client(`/course/${id}`, { data, method: "PATCH" });
  return res.data[0];
};

const deleteCourse = async (id) => {
  const res = await client(`/course/${id}`, { method: "DELETE" });
  return res.data[0];
};

import Table from "components/admin-page/common/table";
import Button from "components/admin-page/common/button";
import Toggle from "react-toggle";
const defaultPhrase = "Переклад Відсутній";

const CoursesList = (props) => {
  const { courses } = props;
  const queryClient = useQueryClient();

  // Mutations
  const { mutate } = useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });
  const { mutate: deleteMutation } = useMutation(deleteCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });

  const columns = React.useMemo(
    () => [
      {
        Header: "Назва Курсу",
        accessor: `title`, // accessor is the "key" in the data
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
      {
        Header: "Ціна",
        accessor: "price",
        Cell: ({ row, column }) => {
          return row.original[column.id] || defaultPhrase;
        },
      },
      {
        Header: "Тривалість",
        accessor: "duration",
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
                mutate({ id: row.original._id, is_active: e.target.checked });
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
            <Link path={`courses/edit-course/${row.original._id}`}>
              <Button>Edit</Button>
            </Link>
          );
        },
      },
      {
        Header: "Видалити",
        accessor: "description",
        Cell: ({ row }) => {
          return (
            <Button
              onClick={() => {
                deleteMutation(row.original._id);
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

  return <Table data={courses || []} columns={columns} />;
};

export default CoursesList;
