import s from './CardsColumn.module.css';
import { Icon } from '../../components/Icon/Icon.jsx';
import Card from '../../components/Card/Card.jsx';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import { useState } from 'react';

const CardsColumn = ({ column }) => {
  const [addCard, setAddCard] = useState([]);
  console.log('card1', addCard);

  // const handleAddCardButton = () => {
  //   setAddCard([
  //     ...addCard,
  //     <Card
  //       key={uniqueId()}
  //       index={addCard.length}
  //       moveCardRight={moveCardRight}
  //     />,
  //   ]);
  // };

  const addCardButtonLabel = !addCard.length ? 'Add card' : 'Add another card';

  return (
    <div className={s.singleColumnWrapper}>
      <div className={s.columnTitleWrapper}>
        <p className={s.columnTitle}>{column.name}</p>
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
        {column.cards.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </div>

      <button className={s.addCardBtn}>
        <AddButton color="dark" width={28} height={28} iconSize={14} />
        {addCardButtonLabel}
      </button>
    </div>
  );
};

export default CardsColumn;
