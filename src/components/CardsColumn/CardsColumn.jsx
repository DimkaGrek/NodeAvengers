import s from './CardsColumn.module.css';
import { Icon } from '../../components/Icon/Icon.jsx';
import Card from '../../components/Card/Card.jsx';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { useState } from 'react';

const CardsColumn = () => {
  const [addCard, setAddCard] = useState([]);
  console.log('card1', addCard);

  const columnTitle = 'To Do';

  const uniqueId = () => {
    return Date.now().toString();
  };

  const handleAddCardButton = () => {
    setAddCard([
      ...addCard,
      <Card
        key={uniqueId()}
        index={addCard.length}
        moveCardRight={moveCardRight}
      />,
    ]);
  };

  const addCardButtonLabel = !addCard.length ? 'Add card' : 'Add another card';

  const moveCardRight = index => {
    const updatedCards = [...addCard];
    const movedCard = updatedCards.splice(index, 1)[0];
    const targetIndex = Math.min(index + 1, updatedCards.length);
    updatedCards.splice(targetIndex, 0, movedCard);
    setAddCard(updatedCards);
  };

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
        {addCard.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>

      <button className={s.addCardBtn} onClick={handleAddCardButton}>
        <AddButton color="dark" width={28} height={28} iconSize={14} />
        {addCardButtonLabel}
      </button>
    </div>
  );
};

export default CardsColumn;
