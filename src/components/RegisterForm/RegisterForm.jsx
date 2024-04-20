import s from './RegisterForm.module.css';
import { useEffect, useState } from 'react';
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
  useEffect(() => {
    if (isRegistered) {
      toast.info(`Please check your email for activate your account.`, {
        autoClose: false,
      });
    }
  }, [isRegistered]);

  return (
    <>
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
            console.log(data);
            await dispatch(registerThunk(data))
              .unwrap()
              .then()
              .catch(error => {
                toast.error(error);
              });
            setIsRegistered(true);
          }}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <Link to="https://nodeavengers-back.onrender.com/api/auth/google">
                LINK GOGLE{' '}
              </Link>
              <div>
                <Field name="name" placeholder="Enter your name" type="text" />
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
      </div>
    </>
  );
};

export default RegisterForm;
