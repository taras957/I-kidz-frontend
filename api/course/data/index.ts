import { IHomeInfo } from 'interfaces/home';
import { siteInfo } from 'queries';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';
import { Course } from '..';

// GET
export const getAdminInfo = async () => {
  const res = await client<IHomeInfo[]>('/home');
  return res.data[0];
};
export const useCourseInfo = () => {
  const { data } = useQuery(siteInfo, getAdminInfo);

  const normalized = data?.courses.map((course) => new Course(course)) || [];

  return { data: normalized };
};

// UPDATE
interface IUpdateParams {
  id: string | number;
  is_active: boolean;
}

export const updateCourse = async ({ id, ...data }: IUpdateParams) => {
  await client(`/course/${id}`, { data, method: 'PATCH' });
};
// DELETE
export const deleteCourse = async (id: string | number) => {
  await client(`/course/${id}`, { method: 'DELETE' });
};
