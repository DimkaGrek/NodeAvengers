import * as Yup from 'yup';

export const NeedHelpFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Your title should be 3 or more characters.')
    .required('This field is required.'),
  description: Yup.string()
    .min(8, 'Your description should be 8 or more characters.')
    .required('This field is required.'),
});
