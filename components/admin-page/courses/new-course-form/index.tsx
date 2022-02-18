/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useMutation, useQueryClient } from 'react-query';

import Form from 'components/admin-page/common/form/form';
import TextArea from 'components/admin-page/common/form/textarea';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import FormSelect from 'components/admin-page/common/form/select';

import { siteInfo } from 'queries';

import css from './style.module.css';
import { createCourse, ICreateCourse } from 'api/course/data';
import { useCategoryTranslation } from 'api/course-category/data-mappers/use-category-translation';
import { translationsType } from 'api/course/interfaces/course';
import ImageUploader from '../../common/form/image-uploader';
import { useToaster } from '../../common/toaster';

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
    picture: yup
      .mixed()
      .required('You need to provide a file')
      .test('fileSize', 'File Size is too large', (value) => {
        if (value) {
          return value.size <= 5242880;
        }
        return false;
      }),
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
    age: '',
    category: '',
    picture: null,
    is_active: true,
  };
};
type TDefaultValues = typeof getDefaultValues;

const CourseForm = () => {
  const queryClient = useQueryClient();
  const courseCategoriesOptions = useCategoryTranslation();
  const { i18n } = useTranslation();
  const { burnSuccessToast } = useToaster();
  const language = i18n.language as translationsType;

  const { mutate, isLoading, isSuccess } = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

  const onSubmit = (_data: ICreateCourse) => {
    mutate(_data);
  };
  useEffect(() => {
    if (isSuccess) {
      reset(getDefaultValues(language));
      burnSuccessToast('Курс добавлено!');
    }
  }, [isSuccess]);

  return (
    <Form cls={css['course-style']} onSubmit={handleSubmit(onSubmit)}>
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
      {/* !TODO  */}
      <ImageUploader<TDefaultValues>
        isLoading={isLoading}
        control={control}
        title="Логотип Курсу"
        name="picture"
      />
      <input
        type="checkbox"
        checked={true}
        {...register('is_active')}
        className={'visually-hidden'}
      />

      <FormButton isLoading={isLoading} />
    </Form>
  );
};

export default CourseForm;
