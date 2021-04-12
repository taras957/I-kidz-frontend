import React from "react";
import Spinner from "components/common/spinner";
import css from "./style.module.css";

const Input = (props) => {
  const { formProps, title, isLoading, errors } = props;
  return (
    <div className={css["form-control"]}>
      <label htmlFor="hero_btn">
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <input id={"hero_btn"} {...formProps} />
      <p className={"error"}>{errors}</p>
    </div>
  );
};

export default Input;
