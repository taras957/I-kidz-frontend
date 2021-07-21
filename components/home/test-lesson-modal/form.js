import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import Form from "components/admin-page/common/form/form";
import Input from "components/admin-page/common/form/input";
import InputMask from "components/admin-page/common/form/input-mask";
import FormButton from "components/admin-page/common/form/form-btn";

import css from './style.module.css'

const defaultValues = () => ({
  name: "",
  email: "",
  phone:''
});

const getSchema = () =>
  yup.object().shape({
    name: yup.string().required().min(1).max(55),
    email: yup.string().required().email(),
    phone: yup.string().required(),
  });


const ModalForm = (props) => {
  const { onSubmit, isLoading } = props;

  const { t } = useTranslation();

  const {
    register,
    reset,control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues(),
    resolver: yupResolver(getSchema()),
  });

const formButtonStates= {save:t('test-lesson-form.save'),inprogress:t('test-lesson-form.progress') }

const phoneMask ="+38(099)-99-99-999"
console.log( errors,' errors8888')
  return (
    <Form cls={css['lesson-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input
        errors={errors?.name?.message}
        title={t("test-lesson-form.name")}
        isLoading={isLoading}
        formProps={register(`name`)}
      />
      <InputMask
        mask={phoneMask}
        errors={errors?.phone?.message}
        title={t("test-lesson-form.phone")}
        name={'phone'}
        isLoading={isLoading}
        // formProps={register(`phone`)}
        control={control}

      />
      <Input
      type='email'
        errors={errors?.email?.message}
        title={"Email"}
        isLoading={isLoading}
        formProps={register(`email`)}
      />
      <FormButton states={formButtonStates} isLoading={isLoading} />
    </Form>
  );
};

export default ModalForm;
