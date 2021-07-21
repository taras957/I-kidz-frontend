import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "components/admin-page/common/form/form";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";

import css from "./style.module.css";

const defaultValues = () => ({
  email: "",
  password: "",
});

const getSchema = () =>
  yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

const LoginForm = (props) => {
  const { onSubmit, isLoading } = props;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues(),
    resolver: yupResolver(getSchema()),
  });

  const formButtonStates = {
    save: "Login",
    inprogress: "In Progress",
  };

  console.log(errors, " errors8888");
  return (
    <Form cls={css["login-form"]} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        errors={errors?.email?.message}
        title={"Email"}
        isLoading={isLoading}
        formProps={register(`email`)}
      />
      <Input
        errors={errors?.password?.message}
        title={"Password"}
        isLoading={isLoading}
        formProps={register(`password`)}
      />

      <FormButton states={formButtonStates} isLoading={isLoading} />
    </Form>
  );
};

export default LoginForm;
