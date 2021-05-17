import React from 'react'
import cx from 'classnames'
import css from "./style.module.css";

const Form = ({children,onSubmit,cls}) => {
    return (
      <form className={cx(css["form-grid"],cls)} onSubmit={onSubmit}>
            {children}
      </form>
    )
}

export default Form
