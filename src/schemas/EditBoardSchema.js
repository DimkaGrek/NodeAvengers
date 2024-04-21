import * as Yup from 'yup';

export const Schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Your title should be 3 or more characters.')
    .max(64, 'Your title should not be more than 64 characters.')
    .required('This field is required.'),
});
