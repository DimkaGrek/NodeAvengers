import { Form, Field, Formik } from 'formik';
import s from './NeedHelpForm.module.css';
import Button from '../Button/Button';
import { NeedHelpFormSchema } from '../../schemas/NeedHelpSchema';
import { selectId } from '../../redux/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { needHelpThunk } from '../../redux/user/operations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const NeedHelpForm = ({ toggleModal }) => {
  const userId = useSelector(selectId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        userId,
        title: '',
        description: '',
      }}
      validationSchema={NeedHelpFormSchema}
      onSubmit={values => {
        // console.log(values);
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
          <Button className="button" type="submit">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};
