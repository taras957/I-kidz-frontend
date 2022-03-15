/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IHomeInfo } from 'interfaces/home';
import { useRouter } from 'next/router';
import { singleCourse, siteInfo } from 'queries';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';
import { revalidate } from 'utils/page-revalidate';
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
//   GET SINGLE COURSE
const getCourse = async (pid: string) => {
  if (pid) {
    const res = await client<ICourseData[]>(`course/${pid}`);
    return new Course(res.data[0]);
  }
};

export function useSingleCourse() {
  const router = useRouter();
  const pid = router.query.pid as string;

  return useQuery(singleCourse, async () => {
    return getCourse(pid);
  });
}

// POST
export interface ICreateCourse {
  picture: File | null;
  translations: { [key in translationsType]?: ICourseTranslation };
  category: string;
}
export const createCourse = async (data: ICreateCourse) => {
  const { picture, translations, category } = data;
  const fd = new FormData();

  fd.append('category', category);
  fd.append('translations', JSON.stringify(translations));
  if (picture) {
    fd.append('image', picture, picture.name);
  }

  await client<ICourseData>(`/course/create`, {
    data: fd,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  await revalidate();
};
// UPDATE
interface IUpdateParams {
  id: string | number;
  is_active: boolean;
}

export const updateCourse = async ({ id, ...data }: IUpdateParams) => {
  await client(`/course/${id}`, { data, method: 'PATCH' });
  await revalidate();
};

//  UPDATE FULL COURSE INFO
export interface IUpdateCourse {
  id: string;
  image?: File;
  category: string;
  translations: { [key in translationsType]?: ICourseTranslation };
  token: string;
}
export const updateCourseInfo = async ({
  id,
  image,
  category,
  translations,
  token,
}: IUpdateCourse) => {
  const fd = new FormData();

  fd.append('category', category);
  fd.append('translations', JSON.stringify({ ...translations }));

  if (!!image) {
    fd.append('image', image, image.name);
  }
  await client(`/course/${id}`, {
    data: fd,
    method: 'PATCH',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
    token,
  });
  await revalidate();
};

// DELETE
export const deleteCourse = async (id: string | number) => {
  await client(`/course/${id}`, { method: 'DELETE' });
  await revalidate();
};
