import { useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import s from './AuthPage.module.css';
import ForgotForm from '../../components/ForgotForm/ForgotForm';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
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
