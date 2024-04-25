import s from './CardsColumn.module.css';
import { Icon } from '../../components/Icon/Icon.jsx';
import Card from '../../components/Card/Card.jsx';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../redux/boards/columnOperations.js';
import { useModal } from '../../hooks/useModal.jsx';
import { Modal } from '../../components/Modal/Modal.jsx';
import { ColumnForm } from '../../components/ColumnForm/ColumnForm.jsx';
import { EditCardForm } from '../../components/EditCardForm/EditCardForm.jsx';

const CardsColumn = ({ column }) => {
  const [isEditColumnModal, toggleIsEditColumnModal] = useModal();
  const [isAddCardModal, toggleIsAddCardModal] = useModal();
  const dispatch = useDispatch();

  const handleDeleteColumn = id => {
    dispatch(deleteColumn(id));
  };

  const addCardButtonLabel = !column.length ? 'Add card' : 'Add another card';

  return (
    <div className={s.singleColumnWrapper}>
      <div className={s.columnTitleWrapper}>
        <p className={s.columnTitle}>{column.name}</p>
        <div className={s.columnTitleBtns}>
          <button onClick={toggleIsEditColumnModal}>
            <Icon id="pencil" className={s.columnTitleIcon} size={16} />
          </button>
          <button onClick={() => handleDeleteColumn(column._id)}>
            <Icon id="trash" className={s.columnTitleIcon} size={16} />
          </button>
        </div>
      </div>

      <div className={s.cardsContainer}>
        {column.cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </div>

      <button className={s.addCardBtn} onClick={toggleIsAddCardModal}>
        <AddButton color="dark" width={28} height={28} iconSize={14} />
        {addCardButtonLabel}
      </button>

      <div>
        {isEditColumnModal && (
          <Modal title={'Edit column'} toggleModal={toggleIsEditColumnModal}>
            <ColumnForm toggleModal={toggleIsEditColumnModal} column={column} />
          </Modal>
        )}

        {isAddCardModal && (
          <Modal title={'Add card'} toggleModal={toggleIsAddCardModal}>
            <EditCardForm
              toggleModal={toggleIsAddCardModal}
              columnId={column._id}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CardsColumn;
