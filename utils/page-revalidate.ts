import axios from 'axios';
const revalidateToken = process.env.NEXT_PUBLIC_MY_REVALIDATE_TOKEN;
// const
export const revalidate = (path = '/') => {
  return axios(`/api/revalidate?secret=${revalidateToken}&path=${path}`);
};
