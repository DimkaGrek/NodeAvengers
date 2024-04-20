import * as Yup from 'yup';

export const NeedHelpFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
      'Email is not valid.'
    )
    .required('This field is required.'),
  comment: Yup.string()
    .min(8, 'Your comment hould be 3 or more characters.')
    .required('This field is required.'),
});
