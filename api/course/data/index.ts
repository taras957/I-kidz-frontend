/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IHomeInfo } from 'interfaces/home';
import { siteInfo } from 'queries';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';
import { Course } from '..';
import {
  ICourseData,
  ICourseTranslation,
  translationsType,
} from '../interfaces/course';

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
// POST
export interface ICreateCourse {
  picture: File;
  translations: { [key in translationsType]?: ICourseTranslation };
  category: string;
}
export const createCourse = async (data: ICreateCourse) => {
  const { picture, translations, category } = data;
  const fd = new FormData();

  fd.append('category', category);
  fd.append('translations', JSON.stringify(translations));

  fd.append('image', picture, picture.name);

  await client<ICourseData>(`/course/create`, {
    data: fd,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
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
