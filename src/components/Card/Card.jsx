import s from "./Card.module.css";

const Card = () => {
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
      <ul className={s.cardInfoTitlesWrapper}>
        <li className={s.cardInfoTitle}>Priority</li>
        <li className={s.cardInfoTitle}>Deadline</li>
      </ul>
      <ul className={s.cardInfoStatsWrapper}>
        <li className={s.cardInfoPriority}>
          <div className={s.cardInfoPriorityFlag}></div>
          <p className={s.cardInfoPriorityText}>Without</p>
        </li>
        <li className={s.cardInfoDeadline}>12/05/2023</li>
      </ul>
    </div>
  );
};

export default Card;
