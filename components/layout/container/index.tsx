import React, { FC } from 'react';
import css from './style.module.css';
const Container: FC = ({ children }) => {
  return <div className={css['container']}>{children}</div>;
};

export default Container;
