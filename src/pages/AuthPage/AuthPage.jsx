import { useParams } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import ForgotForm from '../../components/ForgotForm/ForgotForm';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
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
