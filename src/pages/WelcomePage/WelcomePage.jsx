import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import s from "./WelcomePage.module.css";

import boyImg1 from "../../assets/images/boy@1x.png";
import boyImg2 from "../../assets/images/boy@2x.png";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/Modal/Modal";

const WelcomePage = () => {
  const [isModal, toggleIsModal] = useModal();

  return (
    <main className={s.wrapper}>
      <picture>
        <source srcSet={`${boyImg1} 1x, ${boyImg2} 2x`} type="image/png" />
        <img className={s.userPhoto} src={boyImg1} alt="Photo of the user" />
      </picture>
      <div>
        <Icon id="logo" className="icon" size={20} />
        <p>Task Pro</p>
      </div>
      <p className={s.description}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don&#x27;t wait, start achieving your goals now!
      </p>
      <Link to="/auth" className={s.link_registration}>
        Registration
      </Link>
      <Link to="/auth" className={s.link_login}>
        Log In
      </Link>

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
