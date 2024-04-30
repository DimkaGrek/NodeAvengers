import { useState } from 'react';

import {
  Icon,
  Card,
  Modal,
  EditCardForm,
  ColumnForm,
  ConfirmDelete,
} from 'components';

import { useModal } from '../../hooks';

import s from './CardsColumn.module.css';

export const CardsColumn = ({ column }) => {
  const [deletedColumn, setDeletedColumn] = useState(null);

  const [isEditColumnModal, toggleIsEditColumnModal] = useModal();
  const [isAddCardModal, toggleIsAddCardModal] = useModal();
  const [isConfirmDeleteModal, toggleIsConfirmDeleteModal] = useModal();

  const handleDeleteColumn = column => {
    setDeletedColumn(column);
    toggleIsConfirmDeleteModal();
  };

  const addCardButtonLabel =
    column.cards.length === 0 ? 'Add card' : 'Add another card';

  return (
    <div className={s.singleColumnWrapper}>
      <div className={s.columnTitleWrapper}>
        <p className={s.columnTitle}>{column.name}</p>
        <div className={s.columnTitleBtns}>
          <button onClick={toggleIsEditColumnModal}>
            <Icon id="pencil" className={s.columnTitleIcon} size={16} />
          </button>
          <button onClick={() => handleDeleteColumn(column)}>
            <Icon id="trash" className={s.columnTitleIcon} size={16} />
          </button>
        </div>
      </div>

      <div className={s.cardsContainer}>
        {column.cards.length !== 0 &&
          column.cards
            .slice()
            .reverse()
            .map(card => <Card key={card._id} card={card} />)}
      </div>

      <button className={`${s.addCardBtn}`} onClick={toggleIsAddCardModal}>
        <span className={s.buttonIconContainer}>
          <Icon id="plus" className={s.buttonIconPlus} size={12} />
        </span>
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
      {isConfirmDeleteModal && (
        <Modal
          title={`Are you sure you want to delete "${deletedColumn.name}" column?`}
          toggleModal={toggleIsConfirmDeleteModal}
          pad="35px"
        >
          <ConfirmDelete
            toggleModal={toggleIsConfirmDeleteModal}
            id={deletedColumn._id}
            name="column"
          />
        </Modal>
      )}
    </div>
  );
};
