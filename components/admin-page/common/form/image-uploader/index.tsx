import Spinner from '@/components/common/spinner';
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldValues,
  useWatch,
} from 'react-hook-form';
import FormControl from '../form-controll';
import defaultLogo from 'images/default-images/dafault-logo.png';

interface IImageInputProps {
  title: string;
  isLoading: boolean;
}
export type IImageUploaderPros<T extends FieldValues> = IImageInputProps &
  ControllerProps<T>;

function ImageUploader<T extends FieldValues>(props: IImageUploaderPros<T>) {
  const { title, isLoading, control, name } = props;
  const watchPicture = useWatch({ control, name });

  const imgSrc = React.useMemo(() => {
    if (!watchPicture) {
      return defaultLogo.src;
    }
    return URL.createObjectURL(watchPicture);
  }, [watchPicture]);
  return (
    <FormControl>
      <label htmlFor={title}>
        {title}
        <Spinner isLoading={isLoading} />
      </label>
      <img width={225} src={imgSrc} alt="logo" />
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, ref }, fieldState: { error } }) => (
          <>
            <input
              id={title}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onChange(e.target.files[0]);
                }
              }}
              type="file"
              ref={ref}
            />
            {error?.message ? <p className={'error'}>{error.message}</p> : null}
          </>
        )}
      />
    </FormControl>
  );
}

export default ImageUploader;
