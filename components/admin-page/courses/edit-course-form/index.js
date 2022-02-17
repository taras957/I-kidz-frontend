import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { getCategories } from 'hooks/useHomePageInfo';
import { singleCourse, courseCategories } from 'queries';

import { useMutation, useQueryClient, useQuery } from 'react-query';
import { client } from 'utils/api-client';
import { useUser } from 'context/auth-provider';
const getCourse = async (pid) => {
  const res = await client(`course/${pid}`);

  return res.data[0];
};

import Form from 'components/admin-page/common/form/form';
import TextArea from 'components/admin-page/common/form/textarea';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import FormSelect from 'components/admin-page/common/form/select';

import css from './style.module.css';

const getSchema = (lang) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(40),
        subtitle: yup.string().required().min(5).max(120),
        price: yup.string().required(),
        duration: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
    category: yup.string().required(),
  });

const defaultValues = {
  title: '',
  subtitle: '',
  price: '',
  duration: '',
  description: '',
  category: '',
};

const EditCourseForm = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data: categories } = useQuery(courseCategories, getCategories);
  const user = useUser();
  const { token } = user;
  const { i18n } = useTranslation();
  const { language } = i18n;

  const courseCategoriesOptions = categories?.map(
    (options) => options[language]
  );

  const { data } = useQuery(singleCourse, async () => {
    return getCourse(pid);
  });
  const queryClient = useQueryClient();
  const fileInput = React.useRef();

  const updateCourse = async ({
    _id,
    image = null,
    category,
    translations,
    allData,
  }) => {
    const fd = new FormData();

    fd.append('category', category);
    fd.append('translations', JSON.stringify({ ...allData, ...translations }));

    if (image?.current.files.length) {
      fd.append('image', image.current.files[0], image.current.files[0].name);
    }
    const res = await client(`/course/${_id}`, {
      data: fd,
      method: 'PATCH',
      headers: { 'Content-Type': 'multipart/form-data' },
      isBlob: true,
      token,
    });

    return res.data[0];
  };

  const { mutate, isLoading } = useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(singleCourse);
    },
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(getSchema(language)),
  });

  const onSubmit = (params) => {
    if (fileInput.current) {
      params.image = fileInput;
    }

    mutate({ ...params, allData: data.translations });
  };

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const path = `${process.env.NEXT_PUBLIC_API}/${data?.path}`;
  return (
    <Form
      key={language}
      cls={css['course-style']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        errors={errors?.translations?.[language]?.title?.message}
        title={'Назва Курсу'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.title`)}
      />
      <Input
        errors={errors?.translations?.[language]?.subtitle?.message}
        title={'Підзаголовок'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.subtitle`)}
      />

      <FormSelect
        options={courseCategoriesOptions}
        isLoading={isLoading}
        errors={errors.category?.message}
        title={'Вікова Група'}
        control={control}
        name={'category'}
      />

      <Input
        errors={errors?.translations?.[language]?.price?.message}
        title={'Ціна'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.price`)}
      />
      <Input
        errors={errors?.translations?.[language]?.duration?.message}
        title={'Тривалість'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.duration`)}
      />
      <TextArea
        errors={errors?.translations?.[language]?.description?.message}
        title={'Опис'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.description`)}
        id={'title'}
      />
      <input ref={fileInput} type="file" name="image" />
      <input
        value={true}
        {...register('is_active')}
        className={'visually-hidden'}
      />
      <input value={true} {...register('_id')} className={'visually-hidden'} />
      <img className={css['course-image']} alt="course picture" src={path} />
      <FormButton isLoading={isLoading} />
    </Form>
  );
};

export default EditCourseForm;
