import { translationsType } from 'domain/course/interfaces/course';
import { LARGE_FILE, REQUIRED } from 'enums/schema-validation-errors';
import * as yup from 'yup';

export const getDefaultValues = (language: translationsType) => ({
  translations: {
    [language]: {
      title: '',
    },
  },
  link: '',
  is_active: false,
});

export const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required(REQUIRED).min(5).max(55),
      }),
    }),
    link: yup.string().required(REQUIRED),
    image: yup.mixed().test('fileSize', LARGE_FILE, (value) => {
      if (value) {
        return value.size <= 5242880;
      }
      return false;
    }),
  });
