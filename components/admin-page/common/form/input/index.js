import React from "react";
import Spinner from "components/common/spinner";
import css from "./style.module.css";

const Input = (props) => {
  const { formProps, title, isLoading, errors,type='text',  } = props;
  console.log(formProps,'formProps')
  return (
    <div className={css["form-control"]}>
      <label htmlFor={title}>
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <input key={title} type={type} id={title} {...formProps}  />
      <p className={"error"}>{errors}</p>
    </div>
  );
};

export default Input;
