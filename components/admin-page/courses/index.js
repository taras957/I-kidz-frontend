import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { client } from "utils/api-client";
import { siteInfo } from "queries";
const updateCourse = async ({ id, ...data }) => {
  const res = await client(`/course/${id}`, { data, method: "PATCH" });
  return res.data[0];
};

import Table from "components/admin-page/common/table";
import Button from "components/admin-page/common/button";
import Toggle from "react-toggle";

const CoursesList = (props) => {
  const { courses } = props;
  const queryClient = useQueryClient();

  // Mutations
  const { mutate } = useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });
  const columns = React.useMemo(
    () => [
      {
        Header: "Назва Курсу",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Ціна",
        accessor: "price",
      },
      {
        Header: "Тривалість",
        accessor: "duration",
      },

      {
        Header: "Активний",
        accessor: "is_active",
        Cell: ({ row, column }) => {
          return (
            <Toggle
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
        Cell: () => {
          return <Button>Edit</Button>;
        },
      },
      {
        Header: "Видалити",
        accessor: "description",
        Cell: () => {
          return <Button color={"#D23F31"}>Delete</Button>;
        },
      },
    ],
    []
  );

  return <Table data={courses || []} columns={columns} />;
};

export default CoursesList;
