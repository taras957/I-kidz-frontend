import React from 'react'
import css from "./style.module.css";

const Form = ({children,onSubmit}) => {
    return (
      <form className={css["form-grid"]} onSubmit={onSubmit}>
            {children}
      </form>
    )
}

export default Form
