import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { singleCourse } from 'queries';

import { useMutation, useQueryClient } from 'react-query';
import { useUser } from 'context/auth-provider';

import Form from 'components/admin-page/common/form/form';
import TextArea from 'components/admin-page/common/form/textarea';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import FormSelect from 'components/admin-page/common/form/select';

import css from './style.module.css';
import ImageUploader from '../../common/form/image-uploader';
import { useCategoryTranslation } from 'api/course-category/data-mappers/use-category-translation';
import { translationsType } from 'api/course/interfaces/course';
import {
  IUpdateCourse,
  updateCourseInfo,
  useSingleCourse,
} from 'api/course/data';

const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup
          .string()
          .required(`це поле є обов'язковим`)
          .min(5, 'мінімум 5 символів')
          .max(40, 'максимум 40 символів'),
        subtitle: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
        price: yup
          .string()
          .min(3, 'мінімум 3 символи')
          .required("це поле є обов'язковим"),
        duration: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
        description: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
      }),
    }),
    category: yup.string().required("це поле є обов'язковим"),
  });
const getDefaultValues = (lang: translationsType) => {
  return {
    translations: {
      [lang]: {
        title: '',
        subtitle: '',
        price: '',
        duration: '',
        description: '',
      },
    },

    category: '',
    path: '',
    isActive: true,
    id: '',
    token: '',
  };
};
type TDefaultValues = ReturnType<typeof getDefaultValues>;

const EditCourseForm = () => {
  const courseCategoriesOptions = useCategoryTranslation();
  const user = useUser();
  const { token } = user;
  const { i18n } = useTranslation();

  const { data } = useSingleCourse();
  const queryClient = useQueryClient();
  const language = i18n.language as translationsType;

  const { mutate, isLoading } = useMutation(updateCourseInfo, {
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
    defaultValues: getDefaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

  const onSubmit = (params: IUpdateCourse) => {
    if (data) {
      mutate({
        ...params,
        token,
      });
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
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

      <input {...register('id')} className={'visually-hidden'} />
      <input
        value={token}
        {...register('token')}
        className={'visually-hidden'}
      />

      <ImageUploader<TDefaultValues>
        isLoading={isLoading}
        control={control}
        path={path}
        title="Логотип Курсу"
        name="image"
      />
      <FormButton isLoading={isLoading} />
    </Form>
  );
};

export default EditCourseForm;
