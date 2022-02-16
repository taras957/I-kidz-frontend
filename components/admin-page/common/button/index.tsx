import React, { ReactElement } from 'react';
import cx from 'classnames';
import css from './style.module.css';
interface IButtonProps {
  children: ReactElement;
  cls?: string;
  onClick(): void;
  color?: string;
}

const Button = (props: IButtonProps) => {
  const { children, cls, onClick, color = '#4285F4' } = props;
  return (
    <button
      className={cx(css['button'], cls)}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
