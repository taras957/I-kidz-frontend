import { useMutation, useQueryClient, useQuery } from "react-query";
import { teamPersons } from "queries";
import { client } from "utils/api-client";
import {useRouter} from 'next/router'
export const getTeamPersons = async () => {
  const res = await client("/team-persons");
  return res.data;
};

export const getSingleTeamPerson = async (id) => {
  const res = await client(`/team-person/${id}`);
  return res.data;
};
export const removeTeamPerson = async (id) => {
  const res = await client(`/team-person/${id}`, {method:'DELETE'});
  return res.data;
};

export const createTeamPerson = async (data) => {
  const { image, translations, is_active } = data;

  const fd = new FormData();
    console.log(image)

  fd.append("translations", JSON.stringify(translations));
  fd.append(" is_active", is_active);
  fd.append("image", image, image.name);

  const res = await client("/team-person/create", {
    data:fd,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    isBlob: true,
  });
  return res.data;
};
export const updateTeamPerson = async (data) => {
  const { image, translations, is_active ,_id} = data;

  const fd = new FormData();
    console.log(translations,'personId')
if(translations){
  fd.append("translations", JSON.stringify(translations));

}
  fd.append("is_active", is_active);
  if( image) {
  fd.append("image", image, image.name);

  }

  const res = await client(`/team-person/${_id}`, {
    data:fd,
    method: "PATCH",
    headers: { "Content-Type": "multipart/form-data" },
    isBlob: true,
  });
  return res.data;
};

export const useTeamPersons = () => {

  const queryClient = useQueryClient();
  const { data } = useQuery(teamPersons, getTeamPersons);

  const { mutate, isLoading } = useMutation(createTeamPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries(teamPersons);
    },
  });
  const { mutate:updatePerson,  } = useMutation(updateTeamPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries(teamPersons);
    },
  });
  const { mutate: removePerson,  } = useMutation(removeTeamPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries(teamPersons);
    },
  });

  return { data, createPerson: mutate,updatePerson,removePerson, isLoading };
};

export const useSinglePerson = () => {
  const router = useRouter()
const {pid} = router.query


  const { data, isLoading } = useQuery([teamPersons,pid], ()=> getSingleTeamPerson(pid));


  return { data, isLoading };
};
