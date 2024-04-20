import { Modal } from '../../components/Modal/Modal';
import { NeedHelpForm } from '../../components/NeedHelpForm/NeedHelpForm';
import { useModal } from '../../hooks/useModal';

export const TestPage = () => {
  const [isModal, toggleIsModal] = useModal();

  return (
    <>
      <button
        style={{ backgroundColor: 'blue', padding: '10px' }}
        onClick={toggleIsModal}
      >
        Open modal
      </button>
      {isModal && (
        <Modal toggleModal={toggleIsModal} title="Need help">
          <NeedHelpForm />
        </Modal>
      )}
    </>
  );
};
