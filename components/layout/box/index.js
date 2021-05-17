import React from "react";
import css from "./style.module.css";
const Box = ({ children }) => {
  return <div className={css.box}>{children}</div>;
};

export default Box;
