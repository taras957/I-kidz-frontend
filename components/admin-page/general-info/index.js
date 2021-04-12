import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "components/admin-page/common/form/form";
import TextArea from "components/admin-page/common/form/textarea";
import Input from "components/admin-page/common/form/input";
import FormButton from "components/admin-page/common/form/form-btn";

import { client } from "utils/api-client";
import { siteInfo } from "queries";

const schema = yup.object().shape({
  hero: yup.object().shape({
    title: yup.string().required().min(10).max(40),
    sub_title: yup.string().required(),
    button: yup.string().required(),
  }),
});

const updateHomeInfo = async (data) => {
  const { id, ...params } = data;
  const res = await client(`/home/${id}`, { data: params, method: "PATCH" });
  return res;
};

const GeneralInfoForm = (props) => {
  const queryClient = useQueryClient();

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
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    reset(props);
  }, [props, reset]);

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          errors={errors.hero?.title?.message}
          title={"Hero title"}
          isLoading={isLoading}
          formProps={register("hero.title")}
          id={"title"}
        />
        <TextArea
          errors={errors.hero?.sub_title?.message}
          title={"Hero Sub title"}
          isLoading={isLoading}
          formProps={register("hero.sub_title")}
        />
        <Input
          errors={errors.hero?.button?.message}
          title={"Hero Btn Text"}
          isLoading={isLoading}
          formProps={register("hero.button")}
        />
        <input className={"visually-hidden"} {...register("id")} />
        <FormButton isLoading={isLoading} />
        {/* <div className={css["form-control"]}>
          <label htmlFor="hero_btn">Address1</label>
          <textarea id={"sub_title"} {...register("sub_title")} />
          <p>{errors.hero_btn?.message}</p>  </div>
        <div className={css["form-control"]}>
          <label htmlFor="hero_btn">Address2</label>
          <textarea id={"sub_title"} {...register("sub_title")} />
          <p>{errors.hero_btn?.message}</p>  </div>

        <div className={css["form-control"]}>
          <label htmlFor="hero_btn">Instagram</label>
          <input id={"hero_btn"} {...register("hero_btn")} />
          <p>{errors.hero_btn?.message}</p>  </div>

        <div className={css["form-control"]}>
          <label htmlFor="hero_btn">Facebook</label>
          <input id={"hero_btn"} {...register("hero_btn")} />
          <p>{errors.hero_btn?.message}</p>  </div>


        <div className={css["form-control"]}>
          <label htmlFor="email">Email</label>
          <input type='email' id={"email"} {...register("email")} />
          <p>{errors.email?.message}</p>  </div>


     <div className={css["form-control"]}>
          <button className={cx(css["btn"], css["first"])}> Зберегти </button>
        </div> */}
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
