/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from 'react';

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

const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(40),
        subtitle: yup.string().required(),
        price: yup.string().required(),
        duration: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
    category: yup.string().required(),
    picture: yup
      .mixed()
      .required('You need to provide a file')
      .test('fileSize', 'File Size is too large', (value) => {
        return value[0].size <= 5242880;
      })
      .test(
        'fileType',
        'Unsupported File Format',
        (value) =>
          !['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      ),
  });

const getDefaultValues = (lang: translationsType) => {
  return {
    translations: {
      [lang]: {
        title: ' ',
        subtitle: ' ',
        price: ' ',
        duration: ' ',
        description: ' ',
      },
    },
    age: '',
    category: '',
    picture: null,
    is_active: true,
  };
};

const CourseForm = () => {
  const queryClient = useQueryClient();
  const fileInput = React.useRef<HTMLInputElement>(null);
  const courseCategoriesOptions = useCategoryTranslation();

  const { i18n } = useTranslation();

  const language = i18n.language as translationsType;

  const { mutate, isLoading } = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

  type IOnSubmit = Omit<ICreateCourse, 'picture'>;
  const onSubmit = (_data: IOnSubmit) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload = { ..._data, picture: fileInput.current?.files?.[0]! };

    mutate(payload);
  };
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
      <input ref={fileInput} type="file" name="picture" />
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
