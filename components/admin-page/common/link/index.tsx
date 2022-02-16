import React, { ReactElement } from 'react';
import cx from 'classnames';
import css from './style.module.css';
import Link from 'next/link';

interface IProps {
  children: ReactElement;
  path: string;
  cls: string;
}
const CustomLink = (props: IProps) => {
  const { children, path, cls } = props;

  return (
    <Link href={path}>
      <a className={cx(css['link'], cls)}>{children}</a>
    </Link>
  );
};

export default CustomLink;
