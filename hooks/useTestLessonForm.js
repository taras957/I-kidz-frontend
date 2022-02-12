import { useMutation } from 'react-query';
import { client } from 'utils/api-client';

export const sendTestLessonForm = async (data) => {
  const res = await client('/test-lesson/create', {
    data: data,
    method: 'POST',
  });
  return res.data;
};
export const useTestLessonForm = () => {
  const {
    mutate: post,
    isLoading,
    isSuccess,
  } = useMutation(sendTestLessonForm);
  return { post, isLoading, isSuccess };
};
