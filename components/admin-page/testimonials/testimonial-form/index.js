import {useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import Form from "components/admin-page/common/form/form";
import TextArea from "components/admin-page/common/form/textarea";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";

import css from "./style.module.css";

const defaultValues = (language) => ({
  translations: {
    [language]: {
      title: "",
      date: "",
      description: "",
    },
  }
});

const getSchema = (lang) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(40),
        date: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
  });

const TestimonialForm = (props) => {
    const {onSubmit,isLoading , values } = props
  const { i18n } = useTranslation();
  const { language } = i18n;
  const {
    register,
    reset,

    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:  defaultValues(language),
    resolver: yupResolver(getSchema(language)),
  });

    useEffect(() => {
        if(values){

    reset(values);}
  }, [values, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} cls={css["form"]}>
        <Input
          errors={errors?.translations?.[language]?.title?.message}
          title={"Автор"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.title`)}
        />
        <Input
          type='date'
          errors={errors?.translations?.[language]?.date?.message}
          title={"Дата"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.date`)}
        />
        <TextArea
          errors={errors?.translations?.[language]?.description?.message}
          title={"Опис"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.description`)}
          id={"title"}
        />
        <FormButton isLoading={isLoading} />

      <input {...register('_id')}  className={"visually-hidden"} />
    </Form>
  );
};

export default  TestimonialForm;
