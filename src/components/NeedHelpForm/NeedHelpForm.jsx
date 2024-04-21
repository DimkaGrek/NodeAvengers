import { Form, Field, Formik } from 'formik';
import s from './NeedHelpForm.module.css';
import Button from '../Button/Button';
import { NeedHelpFormSchema } from '../../schemas/NeedHelpSchema';

export const NeedHelpForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        comment: '',
      }}
      validationSchema={NeedHelpFormSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.fieldWrapper}>
            <div>
              <Field name="email" type="email" placeholder="Email adress" />
              {errors.email && touched.email ? (
                <p className={s.descrError}>{errors.email}</p>
              ) : null}
            </div>
            <div className={s.commentWrapper}>
              <Field
                name="comment"
                as="textarea"
                placeholder="Comment"
                className={s.comment}
              />
              {errors.comment && touched.comment ? (
                <p className={s.descrError}>{errors.comment}</p>
              ) : null}
            </div>
          </div>
          <Button className="button" type="submit">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};
