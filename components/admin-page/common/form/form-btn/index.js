import React from 'react'
import cx from "classnames";
import css from "./style.module.css";

const defaultState= {save:"Зберегти", inprogress:"Збереження", success:'Збережено'}

const FormButton = (props) => {
    const {isLoading, states=defaultState}=props
    const {save, inprogress} = states
    return (
           <div className={css["form-control"]}>
          <button  disabled={isLoading} type="submit" className={cx(css["btn"], css["first"],{'disabled':isLoading})}>
            {isLoading ? inprogress:save }
          </button>
        </div>
    )
}

export default FormButton
