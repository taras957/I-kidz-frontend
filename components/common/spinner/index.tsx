import React, { FC, ReactElement } from 'react';

import cn from 'classnames/bind';
import css from './style.module.css';

const cx = cn.bind(css);

type SpinnerProps = {
  isLoading: boolean;
};
const Spinner: FC<SpinnerProps> = ({ isLoading }): ReactElement => {
  return <div className={cx('loader-circle', { show: isLoading })}></div>;
};

export default Spinner;
