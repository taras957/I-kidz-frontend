import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "components/admin-page/common/form/form";
import TextArea from "components/admin-page/common/form/textarea";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";

import { client } from "utils/api-client";
import { siteInfo } from "queries";
import css from "./style.module.css";

const getSchema = (lang) =>
  yup.object().shape({
    hero: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(10).max(40),
        sub_title: yup.string().required(),
        button: yup.string().required(),
      }),
    }),
  });

const updateHomeInfo = async (data) => {
  const { id, ...params } = data;
  const res = await client(`/home/${id}`, { data: params, method: "PATCH" });
  return res;
};

const GeneralInfoForm = (props) => {
  const queryClient = useQueryClient();

  const { i18n } = useTranslation();
  const lang = i18n?.language;

  console.log(lang);
  const { mutate, isLoading } = useMutation(updateHomeInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSchema(lang)),
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    reset(props);
  }, [props, reset]);
  console.log(errors);

  if (!lang) return null;
  return (
    <div>
      <Form cls={css["form-custom-cls"]} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={css["form-fieldset"]}>
          <legend className={css["legend"]}>Hero</legend>

          <TextArea
            errors={errors.hero?.[lang]?.title?.message}
            title={"Hero title"}
            isLoading={isLoading}
            formProps={register(`hero.${lang}.title`)}
            id={"title"}
          />
          <TextArea
            errors={errors.hero?.[lang]?.sub_title?.message}
            title={"Hero Sub title"}
            isLoading={isLoading}
            formProps={register(`hero.${lang}.sub_title`)}
          />
          <Input
            errors={errors.hero?.[lang]?.button?.message}
            title={"Hero Btn Text"}
            isLoading={isLoading}
            formProps={register(`hero.${lang}.button`)}
          />
        </fieldset>
        <fieldset className={css["form-fieldset"]}>
          <legend className={css["legend"]}>Contacts</legend>
          <div className={css["contacts-field-set"]}>
            <Input
              errors={errors.contacts?.instagram?.message}
              title={"instagram"}
              isLoading={isLoading}
              formProps={register("contacts.instagram")}
            />
            <Input
              errors={errors.contacts?.facebook?.message}
              title={"facebook"}
              isLoading={isLoading}
              formProps={register("contacts.facebook")}
            />
            <Input
              errors={errors.contacts?.email?.message}
              title={"email"}
              isLoading={isLoading}
              formProps={register("contacts.email")}
            />
            <Input
              errors={errors.contacts?.tel?.tel_number.message}
              title={"Telephone"}
              isLoading={isLoading}
              formProps={register("contacts.tel.tel_number")}
            />
            <Input
              errors={errors.contacts?.tel?.responsible.message}
              title={"Contact Person"}
              isLoading={isLoading}
              formProps={register("contacts.tel.responsible")}
            />
          </div>
        </fieldset>

        <input className={"visually-hidden"} {...register("id")} />
        <div></div>
        <FormButton isLoading={isLoading} />
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
