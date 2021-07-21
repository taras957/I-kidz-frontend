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
      position: "",
      description: "",
    },
  },
  image: null
});

const getSchema = (lang) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(40),
        position: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
    image: yup.mixed().required()
  });

const PersonForm = (props) => {
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
          console.log(values,language,'values')

    reset(values);}
  }, [values, reset]);
  const imgPath = `${process.env.NEXT_PUBLIC_API}/${values?.img_path}`;

console.log(values,'errors')
  return (
    <Form onSubmit={handleSubmit(onSubmit)} cls={css["form"]}>
      <fieldset>
        <Input
          errors={errors?.translations?.[language]?.title?.message}
          title={"Ім'я"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.title`)}
        />
        <Input
          errors={errors?.translations?.[language]?.position?.message}
          title={"Посада"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.position`)}
        />
        <TextArea
          errors={errors?.translations?.[language]?.description?.message}
          title={"Опис"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.description`)}
          id={"title"}
        />
        <FormButton isLoading={isLoading} />
      </fieldset>
      <fieldset>
      <img src={imgPath} alt="person-photo" />
      <input {...register('image')} type='file' />
      <input {...register('_id')}  className={"visually-hidden"} />
      </fieldset>
    </Form>
  );
};

export default  PersonForm;
