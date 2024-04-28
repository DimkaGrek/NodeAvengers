import { Icon } from '../Icon/Icon.jsx';
import s from './Card.module.css';
import { getColorByPriority } from '../../helpers/getColorByPriority.js';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard, editCard } from '../../redux/boards/cardOperations.js';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal.jsx';
import { EditCardForm } from '../EditCardForm/EditCardForm.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice';
import Tooltip from '../Tooltip/Tooltip.jsx';

const Card = ({ card }) => {
  const [isBellActive, setIsBellActive] = useState(false);
  const [isEditCardModal, toggleIsEditCardModal] = useModal();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isChangeColumnButton, setIsChangeColumnButton] = useState(false);
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();

  const { columns } = currentBoard;

  useEffect(() => {
    if (columns.length > 1) {
      setIsChangeColumnButton(true);
    } else {
      setIsChangeColumnButton(false);
    }
  }, [columns.length]);

  const togglePopup = useCallback(() => {
    setIsOpenPopup(!isOpenPopup);
  }, [isOpenPopup]);

  const handleDeleteCard = (cardId, columnId) => {
    dispatch(deleteCard({ cardId, columnId }));
  };

  const cardPriority = card.priority;
  const priorityColorFlag = getColorByPriority(cardPriority);

  const priorityFlagStyle = {
    backgroundColor: priorityColorFlag,
  };

  const priorityFlagStyleBefore = {
    '--priority-color': priorityColorFlag,
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const deadlineDate = new Date(card.deadline);
    const deadlineDay = deadlineDate.getDate();

    if (deadlineDay < currentDay) {
      setIsBellActive(true);
    } else {
      setIsBellActive(false);
    }
  }, [card.deadline]);

  return (
    <div className={s.cardWrapper} style={priorityFlagStyleBefore}>
      <h4 className={s.cardTitle}>{card.title}</h4>
      <Tooltip text={card.description}>
        <p className={s.cardDescr}>{card.description}</p>
      </Tooltip>
      <div className={s.cardDecorLine}></div>
      <div className={s.cardInfoWrapper}>
        <ul className={s.cardInfoPriorityWrapper}>
          <li className={s.cardInfoTitle}>Priority</li>
          <li className={s.cardInfoPriority}>
            <div
              className={s.cardInfoPriorityFlag}
              style={priorityFlagStyle}
            ></div>
            <p className={s.cardInfoPriorityText}>{cardPriority}</p>
          </li>
        </ul>
        <ul className={s.cardInfoDeadlineWrapper}>
          <li className={s.cardInfoTitle}>Deadline</li>
          <li className={s.cardInfoDeadline}>
            {card.deadline && new Date(card.deadline).toLocaleDateString()}
          </li>
        </ul>
      </div>
      <div className={s.cardIconsWrapper}>
        {isBellActive && (
          <div className={s.bellIconButton}>
            <Icon id="bell" className={s.bellIcon} size={16} />
          </div>
        )}
        {isChangeColumnButton && (
          <button id="changeColumnBtn" onClick={togglePopup}>
            <Icon
              id="arrow-circle-broken-right"
              className={s.cardIcon}
              size={16}
            />
          </button>
        )}
        <button onClick={toggleIsEditCardModal}>
          <Icon id="pencil" className={s.cardIcon} size={16} />
        </button>
        <button onClick={() => handleDeleteCard(card._id, card.columnId)}>
          <Icon id="trash" className={s.cardIcon} size={16} />
        </button>
      </div>
      {isEditCardModal && (
        <Modal title={'Edit card'} toggleModal={toggleIsEditCardModal}>
          <EditCardForm toggleModal={toggleIsEditCardModal} card={card} />
        </Modal>
      )}
      {isOpenPopup && (
        <div id="popup" className={s.popupChangeColumnContainer}>
          {columns.map(column => (
            <button
              key={column._id}
              className={s.columnNameItemWrapper}
              onClick={() =>
                dispatch(editCard({ ...card, columnId: column._id }))
              }
            >
              <p
                className={
                  column._id === card.columnId
                    ? s.columnNameActive
                    : s.columnNameDefault
                }
              >
                {column.name}
              </p>
              <Icon
                id="arrow-circle-broken-right"
                className={
                  column._id === card.columnId
                    ? s.cardIconActive
                    : s.cardIconDefault
                }
                size={16}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
