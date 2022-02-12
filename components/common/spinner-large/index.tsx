import React, { FC, ReactElement } from 'react';
import { useIsFetching } from 'react-query';

import cn from 'classnames/bind';
import css from './style.module.css';

const cx = cn.bind(css);

const SpinnerLarge: FC = (): ReactElement => {
  const isFetching = useIsFetching();
  return <div className={cx('loader', { show: isFetching })}></div>;
};

export default SpinnerLarge;
