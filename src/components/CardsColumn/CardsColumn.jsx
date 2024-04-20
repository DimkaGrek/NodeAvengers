import s from './CardsColumn.module.css';
import { Icon } from '../../components/Icon/Icon.jsx';
import Card from '../../components/Card/Card.jsx';
import { AddButton } from '../../components/AddButton/AddButton.jsx';

const CardsColumn = () => {
  const columnTitle = 'To Do';

  return (
    <div className={s.singleColumnWrapper}>
      <div className={s.columnTitleWrapper}>
        <p className={s.columnTitle}>{columnTitle}</p>
        <div className={s.columnTitleBtns}>
          <button>
            <Icon id="pencil" className={s.columnTitleIcon} size={16} />
          </button>
          <button>
            <Icon id="trash" className={s.columnTitleIcon} size={16} />
          </button>
        </div>
      </div>

      <div className={s.cardsContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <button className={s.addCardBtn}>
        <AddButton color="dark" width={28} height={28} iconSize={14} />
        Add another card
      </button>
    </div>
  );
};

export default CardsColumn;
