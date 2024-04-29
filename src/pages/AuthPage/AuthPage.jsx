import { useParams } from 'react-router-dom';

import {
  LoginForm,
  RegisterForm,
  ForgotForm,
  ResetPasswordForm,
} from '../../components';

import s from './AuthPage.module.css';

const AuthPage = () => {
  const { id } = useParams();
  return (
    <div className={s.wrapper}>
      {id === 'login' && <LoginForm />}
      {id === 'register' && <RegisterForm />}
      {id === 'forgot' && <ForgotForm />}
      {id === 'reset' && <ResetPasswordForm />}
    </div>
  );
};

export default AuthPage;
