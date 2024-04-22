import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  resendEmailThunk,
  verifyLoginThunk,
} from '../../redux/auth/operations';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { toast } from 'react-toastify';
import s from './VerifyPage.module.css';
import { Formik, Form, Field } from 'formik';
import Loader from '../../components/Loader/Loader';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
      'Email is not valid.'
    )
    .required('This field is required.'),
});

const messagesList = {
  1: 'Your account was activeted successfully.',
  2: 'Activation link is not valid. Please, try again to receive new link.',
};

const VerifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messageCode } = useParams();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyLogin = async () => {
      if (token) {
        await dispatch(verifyLoginThunk(token))
          .unwrap()
          .then(() => {
            {
              toast.success(`Verification and log in success.`);
              setIsVerified(true);
              navigate('/home');
            }
          });
      }
    };

    verifyLogin();
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (messageCode === '2' && !isVerified) {
      toast.info(
        `Your email has already been verified. Please log in to your account.`
      );
      navigate('/auth/login');
    }
  }, [messageCode, isVerified, navigate]);

  return (
    <>
      {messageCode === '1' ? (
        <Loader />
      ) : messageCode === '2' && isVerified ? (
        <div className={s.error_wrapper}>
          <div className={s.inside_wrapper}>
            {' '}
            <h2 className={s.error_title}>Oops...</h2>
            <p className={s.error_description}>{messagesList[messageCode]}</p>
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
                      `Validation link was sent successfully. Please check your email.`
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
      ) : null}
    </>
  );
};

export default VerifyPage;
