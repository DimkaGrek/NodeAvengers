import { useModal } from '../../hooks/useModal';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { ColumnForm } from '../ColumnForm/ColumnForm.jsx';

const ModalAddColumn = () => {
  const [isModal, toggleIsModal] = useModal();
  return (
    <div>
      <Button type="button" onClick={() => toggleIsModal()}>
        Add
      </Button>
      {isModal && (
        <Modal toggleModal={toggleIsModal}>
          <ColumnForm />
        </Modal>
      )}
    </div>
  );
};

export default ModalAddColumn;
