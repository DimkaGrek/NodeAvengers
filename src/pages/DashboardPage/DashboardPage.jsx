import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import { useState } from 'react';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import AddColumnButton from '../../components/AddColumnButton/AddColumnButton.jsx';

const DashboardPage = () => {
  const [cardsColumns, setCardsColumns] = useState([]);

  const handleAddColumn = () => {
    setCardsColumns([
      ...cardsColumns,
      <CardsColumn key={cardsColumns.length} />,
    ]);
  };

  const buttonLabel = cardsColumns.length ? 'Add another column' : 'Add column';

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        {cardsColumns.map((column, index) => (
          <div key={index}>{column}</div>
        ))}

        <AddColumnButton
          handleAddColumn={handleAddColumn}
          buttonLabel={buttonLabel}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
