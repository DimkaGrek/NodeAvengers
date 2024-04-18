import { EditBoardForm } from "../../components/EditBoardForm/EditBoardForm";
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
          <EditBoardForm />
        </Modal>
      )}
    </>
  );
};
