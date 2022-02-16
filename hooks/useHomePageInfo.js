import { useQuery } from 'react-query';
import { siteInfo, courseCategories, teamPersons } from 'queries';
import { client } from 'utils/api-client';

export const getAdminInfo = async () => {
  const res = await client('/home');
  return res.data[0];
};

export const getCategories = async () => {
  const res = await client('/course/categories');
  return res.data;
};

export const getTeamMembers = async () => {
  const res = await client('/team-persons');
  return res.data;
};

export const useHomeInfo = () => {
  const { data } = useQuery(siteInfo, getAdminInfo);
  return { data };
};

export const useCourseCategories = () => {
  const { data: categories } = useQuery(courseCategories, getCategories);

  return { categories };
};
export const useTeamMembers = () => {
  const { data: team } = useQuery(teamPersons, getTeamMembers);

  return { teamMembers: team };
};
