import s from './RegisterForm.module.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignupSchema } from '../../schemas/RegisterSchema';
import { registerThunk } from '../../redux/auth/operations';
import { toast } from 'react-toastify';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const passVisibility = () => {
    setShowPass(prevState => !prevState);
  };

  return (
    <>
      {isRegistered ? (
        <div className={s.wrapper_verflink}>
          {' '}
          <div className={s.inside_verflink}>
            Verification link was sent successfully. Please, check email to
            activate your account.
          </div>
        </div>
      ) : (
        <div className={s.form_wrapper}>
          <div className={s.inside_wrapper}>
            <p className={s.text}>Registration</p>
            <Link className={s.link_login} to="/auth/login">
              Log In
            </Link>
          </div>
          <Formik
            initialValues={{
              name: '',
              password: '',
              email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async data => {
              await dispatch(registerThunk(data))
                .unwrap()
                .then(() => {
                  setIsRegistered(true);
                })
                .catch(error => {
                  toast.error(error);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                <div>
                  <Field
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                  />
                  {errors.name && touched.name ? (
                    <div className={s.input_error}>{errors.name}</div>
                  ) : null}
                </div>
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
                    placeholder="Create a password"
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
                </div>
                <Button className={s.btn_submit} type="submit">
                  Register Now
                </Button>
              </Form>
            )}
          </Formik>
          <div className={s.wrapper_google}>
            <p className={s.description_google}>
              You can register with your Google Account:
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

export default RegisterForm;
