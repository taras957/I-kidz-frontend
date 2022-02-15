import { FC } from 'react';
import css from './style.module.css';
const ErrorBanner: FC = ({ children }) => {
  return (
    <div className={css['error-msg']}>
      <i className="fa fa-times-circle"></i>
      {children}
    </div>
  );
};

export default ErrorBanner;
