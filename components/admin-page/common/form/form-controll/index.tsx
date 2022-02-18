import React, { FC } from 'react';
import css from './style.module.css';

const FormControl: FC = ({ children }) => {
  return <div className={css['form-control']}>{children}</div>;
};

export default FormControl;
