import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Your title should be 3 or more characters.')
    .max(32, 'Your title should not be more than 32 characters.')
    .required('This field is required.'),
  description: Yup.string()
    .min(3, 'Your description should be 3 or more characters.')
    .required('This field is required.'),
});
