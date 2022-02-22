import { translationsType } from 'api/course/interfaces/course';
import * as yup from 'yup';

export const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup
          .string()
          .required(`це поле є обов'язковим`)
          .min(5, 'мінімум 5 символів')
          .max(40, 'максимум 40 символів'),
        subtitle: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
        price: yup
          .string()
          .min(3, 'мінімум 3 символи')
          .required("це поле є обов'язковим"),
        duration: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
        description: yup
          .string()
          .min(5, 'мінімум 5 символів')
          .required("це поле є обов'язковим"),
      }),
    }),
    category: yup.string().required("це поле є обов'язковим"),
    picture: yup
      .mixed()
      .required('You need to provide a file')
      .test('fileSize', 'File Size is too large', (value) => {
        if (value) {
          return value.size <= 5242880;
        }
        return false;
      }),
  });

export const getDefaultValues = (lang: translationsType) => {
  return {
    translations: {
      [lang]: {
        title: '',
        subtitle: '',
        price: '',
        duration: '',
        description: '',
      },
    },
    age: '',
    category: '',
    picture: null,
    is_active: true,
  };
};
