import React from "react";
import InputMask from "react-input-mask";
import { Controller } from "react-hook-form";

import Spinner from "components/common/spinner";

import css from "./style.module.css";

const FormSelect = (props) => {
  const { title, isLoading, value, control, mask, name } = props;
  return (
    <div className={css["form-control"]}>
      <label htmlFor={title}>
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        rules={{ required: true }}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <>
            <InputMask
              mask={mask}
              className={css["custom-input-mask"]}
              value={value}
              onChange={onChange}
              required
            >
              <input inputRef={ref} type="phone" />
            </InputMask>

            <p className={"error"}>{JSON.stringify(error)}</p>
          </>
        )}
      />
    </div>
  );
};

export default FormSelect;
