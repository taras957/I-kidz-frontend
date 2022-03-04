import { translationsType } from 'api/course/interfaces/course';
import { useRouter } from 'next/router';

import { partnersInfo } from 'queries';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from 'utils/api-client';
import { Partner } from '..';
import { IPartnerData, IPartnerTranslation } from '../interfaces/partner';

interface IAddPartnerInfo {
  image: File;
  translations: { [key in translationsType]?: IPartnerTranslation };
  is_active: boolean;
  link: string;
}

export interface IUpdatePartnerData extends Partial<IAddPartnerInfo> {
  id: string;
}
const getSingleItem = async (id: string) => {
  const res = await client<IPartnerData[]>(`/partners/${id}`);
  return new Partner(res.data[0]);
};

const addPartnerInfo = async (data: IAddPartnerInfo) => {
  const { image, translations, is_active, link } = data;

  const fd = new FormData();

  fd.append('translations', JSON.stringify(translations));
  fd.append(' is_active', JSON.stringify(is_active));

  fd.append('image', image, image.name);

  fd.append('link', link);

  const res = await client('/partners/create', {
    data: fd,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

const updatePartner = async (data: IUpdatePartnerData) => {
  const { image, translations, is_active, id, link } = data;

  const fd = new FormData();
  console.log(translations, 'personId');
  if (link) {
    fd.append('link', link);
  }
  if (translations) {
    fd.append('translations', JSON.stringify(translations));
  }
  fd.append('is_active', JSON.stringify(is_active));
  if (image) {
    fd.append('image', image, image.name);
  }

  const res = await client(`/partners/${id}`, {
    data: fd,
    method: 'PATCH',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

const removePartner = async (id: string) => {
  const res = await client(`/partners/${id}`, { method: 'DELETE' });
  return res.data;
};

// GET
export const getPartnersInfo = async () => {
  const res = await client<IPartnerData[]>('/partners');
  return res.data.map((partner) => new Partner(partner));
};

export const usePartnersInfo = () => {
  const { data } = useQuery(partnersInfo, getPartnersInfo);
  return data || [];
};

export function usePartnerMethods() {
  const queryClient = useQueryClient();
  const { mutate: addPartner, isLoading: isAddPartnerLoading } = useMutation(
    addPartnerInfo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(partnersInfo);
      },
    }
  );
  const { mutate: updatePartnerInfo, isLoading: isUpdateLoading } = useMutation(
    updatePartner,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(partnersInfo);
      },
    }
  );
  const { mutate: removePartnerInfo, isLoading: isRemoveLoading } = useMutation(
    removePartner,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(partnersInfo);
      },
    }
  );
  return {
    addPartner,
    updatePartnerInfo,
    removePartnerInfo,
    isAddPartnerLoading,
    isUpdateLoading,
    isRemoveLoading,
  };
}

export const useSingleItem = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = router.query.pid!;

  const { data, isLoading } = useQuery([partnersInfo, id], () =>
    getSingleItem(id as string)
  );

  return { data, isLoading };
};
