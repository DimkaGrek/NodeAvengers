import Button from '../../components/Button/Button';
import s from './LoginForm.module.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import { Icon } from '../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormShema } from '../../schemas/LoginSchema';
import { loginThunk } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass(prevState => !prevState);
  };
  return (
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
          dispatch(loginThunk(data));
          navigate('/home');
        }}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div>
              <p className={s.description_google}>
                You can log in with your Google Account:
              </p>
            </div>
            <Link to="https://nodeavengers-back.onrender.com/api/auth/google">
              LINK GOOGLE
            </Link>
            <div>
              <Field name="email" type="email" placeholder="Enter your email" />
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
            </div>
            <Button className={s.btn_submit} type="submit">
              Log In Now
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
