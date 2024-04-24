import { Icon } from '../Icon/Icon.jsx';
import s from './Card.module.css';

const Card = ({ moveCardRight, index }) => {
  return (
    <div className={s.cardWrapper}>
      <h3 className={s.cardTitle}>The Watch Spot Design</h3>
      <p className={s.cardDescr}>
        Create a visually stunning and eye-catching watch dial design that
        embodies our brand`s essence of sleek aesthetics and modern elegance.
        Your design should be unique, innovative, and reflective of the latest
        trends in watch design.
      </p>
      <div className={s.cardDecorLine}></div>
      <div className={s.cardInfoWrapper}>
        <ul className={s.cardInfoPriorityWrapper}>
          <li className={s.cardInfoTitle}>Priority</li>
          <li className={s.cardInfoPriority}>
            <div className={s.cardInfoPriorityFlag}></div>
            <p className={s.cardInfoPriorityText}>Without</p>
          </li>
        </ul>
        <ul className={s.cardInfoDeadlineWrapper}>
          <li className={s.cardInfoTitle}>Deadline</li>
          <li className={s.cardInfoDeadline}>12/05/2023</li>
        </ul>
      </div>
      <div className={s.cardIconsWrapper}>
        <button>
          <Icon id="bell" className={s.cardIcon} size={16} />
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
