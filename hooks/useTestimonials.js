import { useMutation, useQueryClient, useQuery } from "react-query";
import { testimonials } from "queries";
import { client } from "utils/api-client";
import {useRouter} from 'next/router'

export const getAllTestimonials = async () => {
  const res = await client("/testimonials");
  return res.data;
};

export const getSingleTestimonial = async (id) => {
  const res = await client(`/testimonial/${id}`);
  return res.data;
};
export const removeTestimonial = async (id) => {
  const res = await client(`/testimonial/${id}`, {method:'DELETE'});
  return res.data;
};

export const createTestimonial = async ({_id,...data}) => {

  const res = await client("/testimonials/create", {
    data:data,
    method: "POST",
 
  });
  return res.data;
};
export const updateTestimonial = async (data) => {
  const {_id, ...restData} = data;

  

  const res = await client(`/testimonial/${_id}`, {
    data:restData,
    method: "PATCH",
  
  });
  return res.data;
};

export const useTestimonials = () => {

  const queryClient = useQueryClient();
  const { data } = useQuery(testimonials, getAllTestimonials);

  const { mutate:create, isLoading } = useMutation(createTestimonial, {
    onSuccess: () => {
      queryClient.invalidateQueries(testimonials);
    },
  });
  const { mutate:update,  } = useMutation(updateTestimonial, {
    onSuccess: () => {
      queryClient.invalidateQueries(testimonials);
    },
  });
  const { mutate: remove,  } = useMutation(removeTestimonial, {
    onSuccess: () => {
      queryClient.invalidateQueries(testimonials);
    },
  });

  return { data, create,update,remove, isLoading };
};

export const useSingleTestimonial = () => {
  const router = useRouter()
const {pid} = router.query


  const { data, isLoading } = useQuery([testimonials,pid], ()=> getSingleTestimonial(pid));


  return { data, isLoading };
};
