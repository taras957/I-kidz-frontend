import { useMutation, useQueryClient, useQuery } from 'react-query';
import { teamPersons } from 'queries';
import { client } from 'utils/api-client';
import { useRouter } from 'next/router';
import {
  iTeamMemberData,
  ITeamMemberTranslation,
} from '../interfaces/team-member';
import { TeamMember } from '..';
import { translationsType } from 'domain/course/interfaces/course';

export const getTeamPersons = async () => {
  const res = await client<iTeamMemberData[]>('/team-persons');
  return (res.data || []).map((t) => new TeamMember(t));
};

export const getSingleTeamPerson = async (id: string) => {
  const res = await client<iTeamMemberData[]>(`/team-person/${id}`);
  return new TeamMember(res.data[0]);
};
export const removeTeamPerson = async (id: string) => {
  const res = await client(`/team-person/${id}`, { method: 'DELETE' });
  return res.data;
};

export interface ITeamMemberAdd {
  image: File;
  is_active: boolean;
  translations: Partial<{ [key in translationsType]: ITeamMemberTranslation }>;
}
export const createTeamPerson = async (data: ITeamMemberAdd) => {
  const { image, translations, is_active } = data;

  const fd = new FormData();
  console.log(image);

  fd.append('translations', JSON.stringify(translations));
  fd.append(' is_active', JSON.stringify(is_active));
  fd.append('image', image, image.name);

  const res = await client('/team-person/create', {
    data: fd,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

export interface ITeamMemberUpdate extends Partial<ITeamMemberAdd> {
  id: string;
}
export const updateTeamPerson = async (data: ITeamMemberUpdate) => {
  const { image, translations, is_active, id } = data;

  const fd = new FormData();
  if (translations) {
    fd.append('translations', JSON.stringify(translations));
  }
  fd.append(' is_active', JSON.stringify(is_active));
  if (image) {
    fd.append('image', image, image.name);
  }

  const res = await client(`/team-person/${id}`, {
    data: fd,
    method: 'PATCH',
    headers: { 'Content-Type': 'multipart/form-data' },
    isBlob: true,
  });
  return res.data;
};

export const useTeamPMembers = () => {
  const { data } = useQuery(teamPersons, getTeamPersons);
  return data;
};
export function useTeamMethods() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(createTeamPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries(teamPersons);
    },
  });
  const { mutate: updatePerson, isLoading: isUpdateLoad } = useMutation(
    updateTeamPerson,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(teamPersons);
      },
    }
  );

  console.table({ createLoading: isLoading, update: isUpdateLoad });
  const { mutate: removePerson } = useMutation(removeTeamPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries(teamPersons);
    },
  });

  return {
    create: mutate,
    update: updatePerson,
    removePerson: removePerson,
    isCreateLoad: isLoading,
    isUpdateLoad: isUpdateLoad,
    isSuccess,
  };
}
export const useSinglePerson = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data, isLoading } = useQuery([teamPersons, pid], () =>
    getSingleTeamPerson(pid as string)
  );

  return { data, isLoading };
};
