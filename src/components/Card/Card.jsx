import { Icon } from '../Icon/Icon.jsx';
import s from './Card.module.css';
import { getColorByPriority } from '../../helpers/getColorByPriority.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/boards/cardOperations.js';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal.jsx';
import { EditCardForm } from '../EditCardForm/EditCardForm.jsx';

const Card = ({ card, column }) => {
  const [isBellActive, setIsBellActive] = useState(false);
  const [isEditCardModal, toggleIsEditCardModal] = useModal();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const dispatch = useDispatch();

  console.log('column', column);
  console.log('card', card);

  const togglePopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };

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
      <p className={s.cardDescr}>{card.description}</p>
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
          <button>
            <Icon id="bell" className={s.bellIcon} size={16} />
          </button>
        )}
        <button onClick={togglePopup}>
          <Icon
            id="arrow-circle-broken-right"
            className={s.cardIcon}
            size={16}
          />
        </button>
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
        <div className={s.popupChangeColumnContainer}>
          <button className={s.columnNameItemWrapper}>
            <p className={s.columnNameActive}>Active</p>
            <Icon
              id="arrow-circle-broken-right"
              className={s.cardIconActive}
              size={16}
            />
          </button>
          <button className={s.columnNameItemWrapper}>
            <p className={s.columnNameDefault}>Default</p>
            <Icon
              id="arrow-circle-broken-right"
              className={s.cardIcon}
              size={16}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
