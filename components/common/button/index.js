import React from "react";
import css from "./style.module.css";
const Button = ({ children, styles,setRef=()=>{} }) => {
  return (
    <button ref={(ref) => setRef(ref)} className={`${css["btn"]} ${css["btn_r"]}  ${styles}`}>
      {children}
    </button>
  );
}

export default Button;
