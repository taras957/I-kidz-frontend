import {useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import Form from "components/admin-page/common/form/form";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";


const defaultValues = (language) => ({
  translations: {
    [language]: {
      title: "",
     
    },
  },
  link: ''
});

const getSchema = (lang) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(55),
       
      }),
    }),
    link: yup.string().required()
  });

const PartnersForm = (props) => {
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
  
  const imgPath = `${process.env.NEXT_PUBLIC_API}/${values?.img_path}`;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
        <Input
          errors={errors?.translations?.[language]?.title?.message}
          title={"Автор"}
          isLoading={isLoading}
          formProps={register(`translations.${language}.title`)}
        />
        <Input
          errors={errors?.link?.message}
          title={"Посилання"}
          isLoading={isLoading}
          formProps={register(`link`)}
        />
   <img src={imgPath} alt="photo" />
      <input {...register('image')} type='file' />
        <FormButton isLoading={isLoading} />

      <input {...register('_id')}  className={"visually-hidden"} />
    </Form>
  );
};

export default  PartnersForm ;
