import React from 'react'
import cx from "classnames";
import css from "./style.module.css";

const FormButton = (props) => {
    const {isLoading}=props
    return (
           <div className={css["form-control"]}>
          <button  disabled={isLoading} type="submit" className={cx(css["btn"], css["first"],{'disabled':isLoading})}>
            {isLoading ? "Збереження" :"Зберегти"}
          </button>
        </div>
    )
}

export default FormButton
