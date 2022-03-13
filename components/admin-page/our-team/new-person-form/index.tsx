import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import TextArea from 'components/admin-page/common/form/textarea';
import Input from 'components/admin-page/common/form/input';
import FormButton from 'components/admin-page/common/form/form-btn';

import ImageUploader from '../../common/form/image-uploader';
import { translationsType } from 'domain/course/interfaces/course';
import { defaultValues, getSchema } from './person.config';
import { useTeamMethods } from 'domain/team-person/data/repository';
import { ITeamMemberTranslation } from 'domain/team-person/interfaces/team-member';
import css from './style.module.css';
interface INewMember {
  image: File;
  is_active: boolean;
  translations: Partial<{
    [key in translationsType]: ITeamMemberTranslation;
  }>;
}
const NewPersonForm = () => {
  const { create, isCreateLoad: isLoading, isSuccess } = useTeamMethods();

  const { i18n } = useTranslation();
  const lang = i18n.language as translationsType;
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues(lang),
    resolver: yupResolver(getSchema(lang)),
  });

  const onSubmit = (newMember: INewMember) => {
    const { image, ...params } = newMember;
    create({ ...params, image });
  };

  useEffect(() => {
    if (isSuccess) {
      reset({ ...defaultValues(lang) });
    }
  }, [isSuccess]);
  return (
    <Form cls={css['new-person-form']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Input
          errors={errors?.translations?.[lang]?.title?.message}
          title={"Ім'я"}
          isLoading={isLoading}
          formProps={register(`translations.${lang}.title`)}
        />
        <Input
          errors={errors?.translations?.[lang]?.position?.message}
          title={'Посада'}
          isLoading={isLoading}
          formProps={register(`translations.${lang}.position`)}
        />
        <TextArea
          errors={errors?.translations?.[lang]?.description?.message}
          title={'Опис'}
          isLoading={isLoading}
          formProps={register(`translations.${lang}.description`)}
          id={'title'}
        />
        <input
          className="visually-hidden"
          type="checkbox"
          checked
          {...register('is_active')}
        />
        <FormButton isLoading={isLoading} />
      </fieldset>
      <fieldset>
        <ImageUploader
          isLoading={isLoading}
          control={control}
          title="Фото"
          name="image"
        />
      </fieldset>
    </Form>
  );
};

export default NewPersonForm;
