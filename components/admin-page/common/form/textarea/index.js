import React from 'react';
import Spinner from 'components/common/spinner';
import css from './style.module.css';

const TextArea = (props) => {
  const { formProps, title, isLoading, errors } = props;
  return (
    <div className={css['form-control']}>
      <label htmlFor={title}>
        {title} <Spinner isLoading={isLoading} />
      </label>
      <textarea id={title} {...formProps} />
      {errors ? <p className={'error'}>{errors}</p> : null}
    </div>
  );
};

export default TextArea;
