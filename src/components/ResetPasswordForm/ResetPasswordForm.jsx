import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { Button, Loader, Icon } from 'components';

import { selectIsLoading } from '../../redux/auth/slice';
import { ForgotPasswordSchema } from '../../schemas';
import { verifyResendPassword } from '../../redux/auth/operations';

import s from './ResetPasswordForm.module.css';

export const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async val => {
    dispatch(verifyResendPassword(val))
      .unwrap()
      .then(data => {
        toast.success(data);
        navigate('/auth/login');
      })
      .catch(error => {
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

          <p className={s.text}>Reset password</p>
        </div>
        <Formik
          initialValues={{
            code: '',
            password: '',
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={data => handleSubmit(data)}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <div>
                <Field name="code" type="text" placeholder="Enter your code" />
                {errors.code && touched.code ? (
                  <div className={s.input_error}>{errors.code}</div>
                ) : null}
              </div>
              <div className={s.pass_input_wrapper}>
                <Field
                  className="input_field_welcome"
                  placeholder="Enter your new password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                />
                {errors.password && touched.password ? (
                  <div className={s.input_error}>{errors.password}</div>
                ) : null}
                <Button
                  type="button"
                  className={s.eyeIconBtn}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <Icon id="eye" className={s.icon} size={18} />
                  ) : (
                    <Icon id="eye-off" className={s.icon} size={18} />
                  )}
                </Button>
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
