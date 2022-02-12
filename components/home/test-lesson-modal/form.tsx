import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Form from 'components/admin-page/common/form/form';
import Input from 'components/admin-page/common/form/input';
import InputMask from 'components/admin-page/common/form/input-mask';
import FormButton from 'components/admin-page/common/form/form-btn';

import css from './style.module.css';

const defaultValues = {
  name: '',
  email: '',
  phone: '',
};

const getSchema = yup.object().shape({
  name: yup.string().required().min(1).max(55),
  email: yup.string().required().email(),
  phone: yup.string().required(),
});

interface IModalProps {
  onSubmit(data: { name: string; email: string; phone: string }): void;
  isLoading: boolean;
  isSuccess: boolean;
}
const phoneMask = '+38(099)-99-99-999';

const ModalForm = (props: IModalProps) => {
  const { onSubmit, isLoading, isSuccess } = props;

  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(getSchema),
  });

  const formButtonStates = {
    save: t('test-lesson-form.save'),
    inprogress: t('test-lesson-form.progress'),
  };

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues);
    }
  }, [isSuccess]);

  return (
    <>
      {isSuccess ? (
        <p data-testid="success" className={css.success}>
          Успішно Відправлено
        </p>
      ) : null}
      <Form cls={css['lesson-form']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          errors={errors?.name?.message}
          title={t('test-lesson-form.name')}
          isLoading={isLoading}
          formProps={register(`name`)}
        />
        <InputMask
          mask={phoneMask}
          errors={errors?.phone?.message}
          title={t('test-lesson-form.phone')}
          name={'phone'}
          isLoading={isLoading}
          control={control}
        />
        <Input
          type="email"
          errors={errors?.email?.message}
          title={'Email'}
          isLoading={isLoading}
          formProps={register(`email`)}
        />
        <FormButton states={formButtonStates} isLoading={isLoading} />
      </Form>
    </>
  );
};

export default ModalForm;
