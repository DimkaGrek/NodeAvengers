import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../Button/Button';
import { NeedHelpFormSchema } from '../../schemas/NeedHelpSchema';
import { needHelpThunk } from '../../redux/user/operations';
import Loader from '../Loader/Loader';
import { useUser } from '../../hooks';
import s from './NeedHelpForm.module.css';

export const NeedHelpForm = ({ toggleModal }) => {
  const { isLoading, id } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        userId: id,
        title: '',
        description: '',
      }}
      validationSchema={NeedHelpFormSchema}
      onSubmit={values => {
        dispatch(needHelpThunk(values))
          .unwrap()
          .then(() => {
            toggleModal();
            toast.success(
              `Your request ${values.title} has been received, please wait for a response`
            );
            navigate(`/home`);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.fieldWrapper}>
            <div>
              <Field name="title" type="text" placeholder="Title" />
              {errors.title && touched.title ? (
                <p className={s.descrError}>{errors.title}</p>
              ) : null}
            </div>
            <div className={s.commentWrapper}>
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className={s.comment}
              />
              {errors.description && touched.description ? (
                <p className={s.descrError}>{errors.description}</p>
              ) : null}
            </div>
          </div>
          <Button className="button" type="submit" disabled={isLoading}>
            Send
            {isLoading && <Loader size={20} classTitle="insideButton" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
