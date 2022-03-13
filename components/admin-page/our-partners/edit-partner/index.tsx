import {
  IUpdatePartnerData,
  usePartnerMethods,
  useSingleItem,
} from 'domain/partner/data';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import { IPartner } from 'domain/partner/interfaces/partner';
import ImageUploader from '../../common/form/image-uploader';
import { translationsType } from 'domain/course/interfaces/course';
import { ObjectKeysTransformation } from 'utils/object-keys-formatter';
import {
  getDefaultValues,
  getSchema,
} from '@/components/admin-page/our-partners/edit-partner/edit-partner-form.config';

type TDefaultValues = Partial<ReturnType<typeof getDefaultValues>> & {
  id: string;
};

type TFormValues = Omit<TDefaultValues, 'image'> & {
  control: typeof Controller;
  id: string;
  image: File;
};
const EditPersonForm = () => {
  const { updatePartnerInfo, isUpdateLoading: isLoading } = usePartnerMethods();
  const { data } = useSingleItem();

  const onSubmit = ({ image, ...params }: IUpdatePartnerData) => {
    console.log(params);
    updatePartnerInfo({ ...params, image });
  };
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

  useEffect(() => {
    if (data) {
      new ObjectKeysTransformation().toSnailCase<IPartner>(data);
      reset(data);
    }
  }, [data, reset]);

  const imgPath = `${process.env.NEXT_PUBLIC_API}/${data?.imgPath}`;

  const onFormSubmit = (data: TDefaultValues) => {
    onSubmit(data);
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
        path={imgPath}
        title="Логотип Курсу"
        name="image"
      />

      <FormButton isLoading={isLoading} />

      <input {...register('id')} className={'visually-hidden'} />
    </Form>
  );
};

export default EditPersonForm;
