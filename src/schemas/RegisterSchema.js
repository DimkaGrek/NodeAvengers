import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Your name should be 2 or more characters.')
    .max(32, 'Your name should not be more than 32 characters.'),
  password: Yup.string()
    .min(8, 'Your password should be 8 or more characters.')
    .max(64, 'Your password should not be more than 64 characters.')
    .matches(/^\S*$/, 'Your password should not contain spaces.')
    .required('This field is required.'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
      'Email is not valid.'
    )
    .required('This field is required.'),
});
