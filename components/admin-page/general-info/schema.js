import * as yup from 'yup';

export const getSchema = (lang) =>
  yup.object().shape({
    hero: yup.object().shape({
      [lang]: yup.object().shape({
        title: yup.string().required().min(10).max(40),
        sub_title: yup.string().required(),
        button: yup.string().required(),
      }),
    }),
  });
