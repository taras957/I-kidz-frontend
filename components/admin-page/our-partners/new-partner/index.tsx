import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import ImageUploader from '../../common/form/image-uploader';
import { translationsType } from 'domain/course/interfaces/course';
import {
  getDefaultValues,
  getSchema,
} from '@/components/admin-page/our-partners/new-partner/new-partner-form.config';
import { IAddPartnerInfo, usePartnerMethods } from 'domain/partner/data';

type TDefaultValues = ReturnType<typeof getDefaultValues>;

type TFormValues = Omit<TDefaultValues, 'image'> & {
  control: typeof Controller;
  image: File;
};
const NewPartner = () => {
  const { addPartner, isAddPartnerLoading: isLoading } = usePartnerMethods();

  const { i18n } = useTranslation();
  const language = i18n.language as translationsType;
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: getDefaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

  const onFormSubmit = (data: IAddPartnerInfo) => {
    addPartner(data);
    reset(getDefaultValues(language));
  };
  return (
    <Form key={language} onSubmit={handleSubmit(onFormSubmit)}>
      <Input
        errors={errors?.translations?.[language]?.title?.message}
        title={'Автор'}
        isLoading={isLoading}
        formProps={register(`translations.${language}.title`)}
      />
      <Input
        errors={errors?.link?.message}
        title={'Посилання'}
        isLoading={isLoading}
        formProps={register(`link`)}
      />
      <ImageUploader<TFormValues>
        isLoading={isLoading}
        control={control}
        title="Логотип Курсу"
        name="image"
      />

      <FormButton isLoading={isLoading} />
    </Form>
  );
};

export default NewPartner;
