import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import s from "./WelcomePage.module.css";

import boyImg1 from "../../assets/images/boy@1x.png";
import boyImg2 from "../../assets/images/boy@2x.png";
import { Modal } from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal";

const WelcomePage = () => {
  const [isModal, toggleIsModal] = useModal();

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
      <button
        style={{ backgroundColor: "blue", padding: "10px" }}
        onClick={toggleIsModal}
      >
        Open modal
      </button>
      {isModal && (
        <Modal toggleModal={toggleIsModal} title="New board">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            incidunt quam ex unde culpa, dolor, rem repellat ea mollitia rerum
            deserunt facilis non dolore eius, molestias commodi temporibus iste
            debitis! Sit saepe, omnis temporibus error doloribus aliquid
            adipisci eveniet consectetur laborum cumque tempora necessitatibus
            assumenda provident, dolor impedit iure officiis fugiat! Quia nisi
            veritatis fugit
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            incidunt quam ex unde culpa, dolor, rem repellat ea mollitia rerum
            deserunt facilis non dolore eius, molestias commodi temporibus iste
            debitis! Sit saepe, omnis temporibus error doloribus aliquid
          </p>
        </Modal>
      )}
    </main>
  );
};

export default WelcomePage;
