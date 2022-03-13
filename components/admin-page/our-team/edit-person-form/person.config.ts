import { translationsType } from 'domain/course/interfaces/course';
import { REQUIRED } from 'enums/schema-validation-errors';
import * as yup from 'yup';

export const defaultValues = (language: translationsType) => ({
  translations: {
    [language]: {
      title: '',
      position: '',
      description: '',
    },
  },
  id: '',
  is_active: true,
});

export const getSchema = (lang: translationsType) =>
  yup.object().shape({
    translations: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required(REQUIRED).min(3).max(40),
        position: yup.string().required(REQUIRED),
        description: yup.string().required(REQUIRED),
      }),
    }),
    image: yup.mixed(),
  });
