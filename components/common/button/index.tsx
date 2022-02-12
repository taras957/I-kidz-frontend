import React, { FC, ReactElement } from 'react';
import css from './style.module.css';

type ButtonProps = {
  children: any;
  styles?: string;
  setRef?: (ref: HTMLButtonElement | null) => void;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  children,
  styles,
  setRef = () => {},
  onClick,
}): ReactElement => {
  return (
    <button
      onClick={onClick}
      ref={(ref) => setRef(ref)}
      className={`${css['btn']} ${css['btn_r']}  ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;
