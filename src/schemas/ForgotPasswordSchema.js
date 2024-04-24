import * as Yup from 'yup';
export const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Your password should be 8 or more characters.')
    .max(64, 'Your password should not be more than 64 characters.')
    .matches(/^\S*$/, 'Your password should not contain spaces.')
    .required('This field is required.'),
  code: Yup.string()
    .required('This field is required.')
});
