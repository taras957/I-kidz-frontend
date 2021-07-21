import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import { client } from "utils/api-client";
import { useMutation, useQueryClient, useQuery } from "react-query";

import Form from "components/admin-page/common/form/form";
import TextArea from "components/admin-page/common/form/textarea";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";
import FormSelect from "components/admin-page/common/form/select";

import { getCategories } from "hooks/useHomePageInfo";
import { siteInfo, courseCategories } from "queries";

import css from "./style.module.css";

const getSchema = (lang) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(5).max(40),
        subtitle: yup.string().required(),
        price: yup.string().required(),
        duration: yup.string().required(),
        description: yup.string().required(),
      }),
    }),
    category: yup.string().required(),
  });

const defaultValues = {
  title: "",
  subtitle: "",
  price: "",
  age: "",
  duration: "",
  description: "",
  category: "",
  picture: null,
};

const CourseForm = () => {
  const queryClient = useQueryClient();
  const fileInput = React.useRef();
  const { data: categories } = useQuery(courseCategories, getCategories);

  const { i18n } = useTranslation();

  const { language } = i18n;
  const courseCategoriesOptions = categories?.map(
    (options) => options[language]
  );

  const createCourse = async (data) => {
    const { picture, translations, category } = data;

    const fd = new FormData();

    fd.append("category", category);
    fd.append("translations", JSON.stringify(translations));

    fd.append("image", picture.current.files[0], picture.current.files[0].name);
    await client(`/course/create`, {
      data: fd,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      isBlob: true,
    });
    // reset(defaultValues);
    return res;
  };
  const { mutate, isLoading } = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(siteInfo);
    },
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(getSchema(language)),
  });

  const onSubmit = (_data) => {
    mutate({ ..._data, picture: fileInput });
  };
  console.log(errors, " errors4234234");
  return (
    <Form cls={css["course-style"]} onSubmit={handleSubmit(onSubmit)}>
      <Input
        errors={errors?.translations?.[language]?.title?.message}
        title={"Назва Курсу"}
        isLoading={isLoading}
        formProps={register(`translations.${language}.title`)}
      />
      <Input
        errors={errors?.translations?.[language]?.subtitle?.message}
        title={"Підзаголовок"}
        isLoading={isLoading}
        formProps={register(`translations.${language}.subtitle`)}
      />

      <FormSelect
        options={courseCategoriesOptions}
        isLoading={isLoading}
        errors={errors.category?.message}
        title={"Вікова Група"}
        control={control}
        name={"category"}
      />

      <Input
        errors={errors?.translations?.[language]?.price?.message}
        title={"Ціна"}
        isLoading={isLoading}
        formProps={register(`translations.${language}.price`)}
      />
      <Input
        errors={errors?.translations?.[language]?.duration?.message}
        title={"Тривалість"}
        isLoading={isLoading}
        formProps={register(`translations.${language}.duration`)}
      />
      <TextArea
        errors={errors?.translations?.[language]?.description?.message}
        title={"Опис"}
        isLoading={isLoading}
        formProps={register(`translations.${language}.description`)}
        id={"title"}
      />
      <input ref={fileInput} type="file" name="picture" />
      <input
        value={true}
        {...register("is_active")}
        className={"visually-hidden"}
      />

      <FormButton isLoading={isLoading} />
    </Form>
  );
};

export default CourseForm;
