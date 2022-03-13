import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import TextArea from 'components/admin-page/common/form/textarea';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';

import css from './style.module.css';
import ImageUploader from '../../common/form/image-uploader';
import {
  ITeamMemberUpdate,
  useSinglePerson,
  useTeamMethods,
} from 'api/team-person/data/repository';
import { defaultValues, getSchema } from './person.config';
import { translationsType } from 'api/course/interfaces/course';

const EditPersonForm = () => {
  const { update, isUpdateLoad: isLoading } = useTeamMethods();
  const { data } = useSinglePerson();
  console.log(data, 'data');
  const onSubmit = (updatedPerson: ITeamMemberUpdate) => {
    update(updatedPerson);
  };
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
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const imgPath = `${process.env.NEXT_PUBLIC_API}/${data?.imgPath}`;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} cls={css['new-person-form']}>
      <fieldset>
        <Input
          errors={errors?.translations?.[language]?.title?.message}
          title={"Ім'я"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.title`)}
        />
        <Input
          errors={errors?.translations?.[language]?.position?.message}
          title={'Посада'}
          isLoading={isLoading}
          formProps={register(`translations.${language}.position`)}
        />
        <TextArea
          errors={errors?.translations?.[language]?.description?.message}
          title={'Опис'}
          isLoading={isLoading}
          formProps={register(`translations.${language}.description`)}
          id={'title'}
        />
        <FormButton isLoading={isLoading} />
      </fieldset>
      <fieldset>
        <ImageUploader
          isLoading={isLoading}
          control={control}
          path={imgPath}
          title="Фото"
          name="image"
        />
        <input {...register('id')} className={'visually-hidden'} />
      </fieldset>
    </Form>
  );
};

export default EditPersonForm;
