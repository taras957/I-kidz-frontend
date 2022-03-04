import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';
import { IPartner } from 'api/partner/interfaces/partner';
import ImageUploader from '../../common/form/image-uploader';
import { translationsType } from 'api/course/interfaces/course';

const defaultValues = (language: translationsType) => ({
  translations: {
    [language]: {
      title: '',
    },
  },
  link: '',
  title: '',
  image: '',
  id: '',
  is_active: false,
});

const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(55),
      }),
    }),
    link: yup.string().required(),
  });

interface IPartnersProps {
  onSubmit(): void;
  isLoading: boolean;
  values: IPartner;
}
type TDefaultValues = ReturnType<typeof defaultValues>;

const PartnersForm = (props: IPartnersProps) => {
  const { onSubmit, isLoading, values } = props;
  console.log(values);
  const { i18n } = useTranslation();
  const language = i18n.language as translationsType;
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

  useEffect(() => {
    if (values) {
      for (const key in values) {
        key.replace(/[A-Z]/g, (letter, index) => {
          return index == 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
        });
        console.log(
          key.replace(/[A-Z]/g, (letter, index) => {
            return index == 0
              ? letter.toLowerCase()
              : '_' + letter.toLowerCase();
          })
        );
      }
      //!TODO camelCase To snakeCase
      reset(values);
    }
  }, [values, reset]);

  const imgPath = `${process.env.NEXT_PUBLIC_API}/${values?.imgPath}`;

  return (
    <Form key={language} onSubmit={handleSubmit(onSubmit)}>
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
      <ImageUploader<TDefaultValues>
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

export default PartnersForm;
