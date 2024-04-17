import { useParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import s from "./AuthPage.module.css";
const AuthPage = () => {
  const { id } = useParams();
  return (
    <div className={s.wrapper}>
      {id === "login" && <LoginForm />}
      {id === "register" && <RegisterForm />}
    </div>
  );
};

export default AuthPage;
