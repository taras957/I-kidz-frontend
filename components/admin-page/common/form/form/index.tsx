import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import css from './style.module.css';

interface IFormProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  cls?: string;
}
const Form = ({ children, onSubmit, cls }: PropsWithChildren<IFormProps>) => {
  return (
    <form
      aria-label="form"
      className={cx(css['form-grid'], cls)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
