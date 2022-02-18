import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

import Spinner from 'components/common/spinner';

import css from './style.module.css';

const FormSelect = (props) => {
  const { title, isLoading, options, control, name } = props;
  return (
    <div className={css['form-control']}>
      <label htmlFor={title}>
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <Controller
        control={control}
        defaultValue={'default_value'}
        name={name}
        rules={{ required: true }}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <>
            <Select
              className={css['custom-select']}
              options={options}
              inputRef={ref}
              value={options?.find((c) => c?.value === value)}
              onChange={(val) => onChange(val.value)}
              required
            />
            {error?.message ? <p className={'error'}>{error.message}</p> : null}
          </>
        )}
      />
    </div>
  );
};

export default FormSelect;
