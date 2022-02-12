import { client } from 'utils/api-client';

export const updateHomeInfo = async (data) => {
  const { id, ...params } = data;
  const res = await client(`/home/${id}`, { data: params, method: 'PATCH' });
  return res;
};
