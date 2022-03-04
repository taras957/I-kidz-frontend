import { useQuery } from 'react-query';
import { partnersInfo } from 'queries';
import { client } from 'utils/api-client';
import { useRouter } from 'next/router';

export const getPartnersInfo = async () => {
  const res = await client('/partners');
  return res.data;
};

export const getSingleItem = async (id) => {
  const res = await client(`/partners/${id}`);
  return res.data;
};

export const addPartnerInfo = async (data) => {
  const { image, translations, is_active, link } = data;

  const fd = new FormData();

  fd.append('translations', JSON.stringify(translations));
  fd.append(' is_active', is_active);
  fd.append('image', image?.[0], image?.[0].name);
  fd.append('link', link);

  const res = await client('/partners/create', {
    data: fd,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

export const updatePartner = async (data) => {
  const { image, translations, is_active, _id, link } = data;

  const fd = new FormData();
  console.log(translations, 'personId');
  if (link) {
    fd.append('link', link);
  }
  if (translations) {
    fd.append('translations', JSON.stringify(translations));
  }
  fd.append('is_active', is_active);
  if (image) {
    fd.append('image', image, image.name);
  }

  const res = await client(`/partners/${_id}`, {
    data: fd,
    method: 'PATCH',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

export const removePartner = async (id) => {
  const res = await client(`/partners/${id}`, { method: 'DELETE' });
  return res.data;
};

export const useSingleItem = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data, isLoading } = useQuery([partnersInfo, pid], () =>
    getSingleItem(pid)
  );

  return { data, isLoading };
};
