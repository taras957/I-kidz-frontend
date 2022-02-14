import React, { FC } from 'react';
import css from './style.module.css';
const Box: FC = ({ children }) => {
  return <div className={css.box}>{children}</div>;
};

export default Box;
