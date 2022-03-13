import { courseCategories } from 'queries';
import { useQuery } from 'react-query';
import { client } from 'utils/api-client';
import { CourseCategory } from '..';
import { ICourseCategoryData } from '../interfaces/course-category';

// GET
export const getCategories = async () => {
  const res = await client<ICourseCategoryData[]>('/course/categories');
  return res.data;
};
export const useCourseCategories = () => {
  const { data: categories } = useQuery(courseCategories, getCategories);
  const normalized =
    categories?.map((category) => new CourseCategory(category)) || [];
  return normalized;
};
