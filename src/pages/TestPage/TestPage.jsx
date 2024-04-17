import { Modal } from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal";

export const TestPage = () => {
  const [isModal, toggleIsModal] = useModal();

  return (
    <>
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
        </Modal>
      )}
    </>
  );
};
