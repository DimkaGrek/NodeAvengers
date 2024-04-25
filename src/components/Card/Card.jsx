import { Icon } from '../Icon/Icon.jsx';
import s from './Card.module.css';
import { getColorByPriority } from '../../helpers/getColorByPriority.js';
import { useState, useEffect } from 'react';

const Card = ({ moveCardRight, index, card }) => {
  const [isBellActive, setIsBellActive] = useState(false);

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

    if (currentDay === deadlineDay) {
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
        <button>
          <Icon
            id="bell"
            className={isBellActive ? s.bellIcon : ''}
            size={16}
          />
        </button>
        <button onClick={() => moveCardRight(index)}>
          <Icon
            id="arrow-circle-broken-right"
            className={s.cardIcon}
            size={16}
          />
        </button>
        <button>
          <Icon id="pencil" className={s.cardIcon} size={16} />
        </button>
        <button>
          <Icon id="trash" className={s.cardIcon} size={16} />
        </button>
      </div>
    </div>
  );
};

export default Card;
