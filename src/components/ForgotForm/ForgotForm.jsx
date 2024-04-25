import Button from '../Button/Button';
import s from './ForgotForm.module.css';
import { Formik, Form, Field } from 'formik';
import Loader from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordThunk } from '../../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { selectIsLoading } from '../../redux/auth/slice';
const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
      'Email is not valid.'
    )
    .required('This field is required.'),
});

export const ForgotForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  const handleSubmit = val => {
    dispatch(resetPasswordThunk(val))
      .unwrap()
      .then(data => {
        toast.success(data);
        navigate('/auth/reset');
      })
      .catch(error => {
        console.log('error ', error);
        toast.error(error);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={s.form_wrapper}>
        <div className={s.inside_wrapper}>
          <Link className={s.link_register} to="/auth/register">
            Registration
          </Link>
          <Link className={s.link_register} to="/auth/login">
            Log in
          </Link>

          <p className={s.text}>Forgot password</p>
        </div>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={schema}
          onSubmit={data => handleSubmit(data)}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                {errors.email && touched.email ? (
                  <div className={s.input_error}>{errors.email}</div>
                ) : null}
              </div>
              <Button className={s.btn_submit} type="submit">
                Reset password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotForm;
