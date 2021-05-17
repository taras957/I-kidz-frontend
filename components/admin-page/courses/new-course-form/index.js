import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { client } from "utils/api-client";
import { useMutation, useQueryClient } from "react-query";

import Form from "components/admin-page/common/form/form";
import TextArea from "components/admin-page/common/form/textarea";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";
import FormSelect from "components/admin-page/common/form/select";

import { siteInfo } from "queries";

import css from "./style.module.css";

const schema = yup.object().shape({
  // title: yup.string().required().min(5).max(40),
  // subtitle: yup.string().required().min(5).max(40),
  // price: yup.number().required(),
  // duration: yup.string().required(),
  // description: yup.string().required(),
  // category: yup.string().required(),
});

const createCourse = async (data) => {
  const { picture, ...restParams } = data;
  const res = await client(`/course/create`, {
    data: restParams,
  });

  const fd = new FormData();

  fd.append("image", picture.current.files[0], picture.current.files[0].name);
  const imageRes = await client(`/course/image/create/${res.data._id}`, {
    data: fd,
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    isBlob: true,
  });
  console.log(res.data._id, "response345435");
  return res;
};

const options = [
  { value: "trainee", label: "6-8 років" },
  { value: "junior", label: "8-10 років" },
  { value: "strong-junior", label: "10-12 років" },
  { value: "middle", label: "12-14 років" },
  { value: "senior", label: "14-16 років" },
];

const CourseForm = () => {
  const queryClient = useQueryClient();
  const fileInput = React.useRef();

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
    resolver: yupResolver(schema),
  });
  const onSubmit = (_data) => {
    const { label } = options.find((o) => o.value === _data.category);
    // const data = { ...data };
    //  console.log(
    //   "onSubmitFn:",
    //   data,
    //   "  imageFile: ",
    //   fileInput.current.files[0].name
    // );
    // const fd = new FormData();
    // for (let key in data) {
    //   fd.append(key, data[key]); // formdata doesn't take objects
    // }
    // fd.append(
    //   "image",
    //   fileInput.current.files[0],
    //   fileInput.current.files[0].name
    // );
    // console.log(fileInput.current.files[0], "fileInput.current");

    mutate({ ..._data, age: label, picture: fileInput });
  };
  console.log(errors, "errors");
  return (
    <Form cls={css["course-style"]} onSubmit={handleSubmit(onSubmit)}>
      <Input
        errors={errors?.title?.message}
        title={"Назва Курсу"}
        isLoading={isLoading}
        formProps={register("title")}
      />
      <Input
        errors={errors?.subtitle?.message}
        title={"Назва Курсу"}
        isLoading={isLoading}
        formProps={register("subtitle")}
      />

      <FormSelect
        options={options}
        isLoading={isLoading}
        errors={errors.category?.message}
        title={"Вікова Група"}
        control={control}
        name={"category"}
      />

      <Input
        errors={errors.price?.message}
        title={"Ціна"}
        isLoading={isLoading}
        formProps={register("price")}
      />
      <Input
        errors={errors.duration?.message}
        title={"Тривалість"}
        isLoading={isLoading}
        formProps={register("duration")}
      />
      <TextArea
        errors={errors.description?.message}
        title={"Опис"}
        isLoading={isLoading}
        formProps={register("description")}
        id={"title"}
      />
      <input ref={fileInput} type='file' name='picture' />
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
