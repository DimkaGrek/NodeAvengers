import { Field, Form, Formik } from 'formik';
import { AddButton } from '../AddButton/AddButton';
import { Schema } from '../../schemas';
import Button from '../Button/Button';

import s from './ColumnForm.module.css';

export const ColumnForm = ({ title }) => {
  const fieldValue = title ? title : '';

  return (
    <Formik
      initialValues={{
        title: fieldValue,
      }}
      validationSchema={Schema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div>
            <Field name="title" type="text" placeholder="Title" />
            {errors.title && touched.title ? (
              <p className={s.descrError}>{errors.title}</p>
            ) : null}
          </div>
          <Button className="button" type="submit">
            <AddButton width="28" height="28" iconSize="14" />{' '}
            {fieldValue ? 'Edit' : 'Add'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
