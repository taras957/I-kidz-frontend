import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { siteInfo } from 'queries';
import Link from 'components/admin-page/common/link';

import Table from 'components/admin-page/common/table';
import Button from 'components/admin-page/common/button';
import Toggle from 'react-toggle';
import { ICourse, ICourseTranslation } from 'api/course/interfaces/course';
import { deleteCourse, updateCourse } from 'api/course/data';
import { CellProps } from 'react-table';

const defaultPhrase = 'Переклад Відсутній';

type CourseItem = Omit<ICourse, 'translations'> & ICourseTranslation;

interface ICourseListProps {
  courses: CourseItem[];
}
const CoursesList = (props: ICourseListProps) => {
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
        Header: 'Назва Курсу',
        accessor: `title` as keyof CourseItem, // accessor is the "key" in the data
        Cell: ({ row, column }: CellProps<CourseItem>) => {
          const columnId = column.id as keyof CourseItem;
          return row.original[columnId] || defaultPhrase;
        },
      },
      {
        Header: 'Ціна',
        accessor: 'price' as keyof CourseItem,
        Cell: ({ row, column }: CellProps<CourseItem>) => {
          const columnId = column.id as keyof CourseItem;
          return row.original[columnId] || defaultPhrase;
        },
      },
      {
        Header: 'Тривалість',
        accessor: 'duration' as keyof CourseItem,
        Cell: ({ row, column }: CellProps<CourseItem>) => {
          const columnId = column.id as keyof CourseItem;

          return row.original[columnId] || defaultPhrase;
        },
      },

      {
        Header: 'Активний',
        accessor: 'isActive' as keyof CourseItem,
        Cell: ({ row }: CellProps<CourseItem>) => {
          return (
            <Toggle
              className={'toggle-center'}
              checked={row.original.isActive}
              name="burritoIsReady"
              onChange={(e) => {
                mutate({ id: row.original.id, is_active: e.target.checked });
              }}
            />
          );
        },
      },
      {
        Header: 'Редагувати',
        accessor: 'id' as keyof CourseItem,
        Cell: ({ row }: CellProps<CourseItem>) => {
          return (
            <Link path={`courses/edit-course/${row.original.id}`}>
              <Button>Edit</Button>
            </Link>
          );
        },
      },
      {
        Header: 'Видалити',
        accessor: 'description' as keyof CourseItem,
        Cell: ({ row }: CellProps<CourseItem>) => {
          return (
            <Button
              onClick={() => {
                deleteMutation(row.original.id);
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

  return <Table<CourseItem> data={courses || []} columns={columns} />;
};

export default CoursesList;
