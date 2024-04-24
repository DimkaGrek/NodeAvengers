import Button from '../../components/Button/Button';
import s from './LoginForm.module.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Loader from '../../components/Loader/Loader';
import { Icon } from '../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormShema } from '../../schemas/LoginSchema';
import { loginThunk } from '../../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { resendEmailThunk } from '../../redux/auth/operations';
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

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const passVisibility = () => {
    setShowPass(prevState => !prevState);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isVerified && !isLoading ? (
        <div className={s.error_wrapper}>
          <div className={s.inside_wrapper_verify}>
            <p className={s.error_title}>
              Your email was not verified. Please, check email for activate your
              account or resend email.
            </p>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={schema}
              onSubmit={data => {
                dispatch(resendEmailThunk(data))
                  .unwrap()
                  .then(
                    toast.success(
                      `Verification link was sent successfully. Please check your email.`
                    )
                  )
                  .catch(error => {
                    toast.error(error);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form className={s.form}>
                  <div>
                    <Field
                      className={s.input_field}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    {errors.email && touched.email ? (
                      <div className={s.input_error}>{errors.email}</div>
                    ) : null}
                  </div>
                  <Button className={s.resend_btn} type="submit">
                    Resend
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <div className={s.form_wrapper}>
          <div className={s.inside_wrapper}>
            <Link className={s.link_register} to="/auth/register">
              Registration
            </Link>
            <p className={s.text}>Log In</p>
          </div>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={LoginFormShema}
            onSubmit={data => {
              dispatch(loginThunk(data))
                .unwrap()
                .then(setIsVerified(true))
                .catch(error => {
                  toast.error(error);
                  navigate('/welcome');
                });
            }}
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
                <div className={s.pass_input_wrapper}>
                  <Field
                    placeholder="Confirm a password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                  />
                  {errors.password && touched.password ? (
                    <div className={s.input_error}>{errors.password}</div>
                  ) : null}
                  <Button
                    type="button"
                    className={s.eyeIconBtn}
                    onClick={passVisibility}
                  >
                    {showPass ? (
                      <Icon id="eye" className={s.icon} size={18} />
                    ) : (
                      <Icon id="eye-off" className={s.icon} size={18} />
                    )}
                  </Button>
                  <Link className={s.link} to="/auth/forgot">
                    forgot password?
                  </Link>
                </div>
                <Button className={s.btn_submit} type="submit">
                  Log In Now
                </Button>
              </Form>
            )}
          </Formik>
          <div className={s.wrapper_google}>
            <p className={s.description_google}>
              You can log in with your Google Account:
            </p>
            <Link
              to="https://nodeavengers-back.onrender.com/api/auth/google"
              className={s.google_link}
            >
              <Icon id="google" size={18} />
              Google
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
