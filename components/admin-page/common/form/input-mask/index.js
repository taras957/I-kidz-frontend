import React from 'react';
import InputMask from 'react-input-mask';
import { Controller } from 'react-hook-form';

import Spinner from 'components/common/spinner';

import css from './style.module.css';

const FormInputMask = (props) => {
  const { title, isLoading, control, mask, name } = props;
  return (
    <div className={css['form-control']}>
      <label htmlFor={title}>
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <>
            <InputMask
              mask={mask}
              className={css['custom-input-mask']}
              value={value}
              onChange={onChange}
              id={title}
            >
              <input id={title} ref={ref} type="phone" />
            </InputMask>
            {error?.message && (
              <p role="alert" className={'error'}>
                {error?.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FormInputMask;
