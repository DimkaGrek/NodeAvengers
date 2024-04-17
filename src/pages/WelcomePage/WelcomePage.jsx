import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import s from "./WelcomePage.module.css";

import boyImg1 from "../../assets/images/boy@1x.png";
import boyImg2 from "../../assets/images/boy@2x.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  const handleRegisterClick = () => {
    navigate("/auth/register");
  };

  return (
    <main className={s.wrapper}>
      <picture>
        <source srcSet={`${boyImg1} 1x, ${boyImg2} 2x`} type="image/png" />
        <img className={s.userPhoto} src={boyImg1} alt="Photo of the user" />
      </picture>
      <div className={s.logo_wrapper}>
        <Icon id="logo" className={s.icon} size={40} />
        <p className={s.logo_text}>Task Pro</p>
      </div>
      <p className={s.description}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don&#x27;t wait, start achieving your goals now!
      </p>
      <Button className={s.btn_registration} onClick={handleRegisterClick}>
        Registration
      </Button>
      <Button className={s.btn_login} onClick={handleLoginClick}>
        Log In
      </Button>
    </main>
  );
};

export default WelcomePage;
