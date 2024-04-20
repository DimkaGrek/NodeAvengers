import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import { useState } from 'react';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import AddColumnButton from '../../components/AddColumnButton/AddColumnButton.jsx';

const DashboardPage = () => {
  const [сardsColumns, setCardsColumns] = useState([]);

  const handleAddColumn = () => {
    setCardsColumns([
      ...сardsColumns,
      <CardsColumn key={сardsColumns.length} />,
    ]);
  };

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        {сardsColumns.map((column, index) => (
          <div key={index}>{column}</div>
        ))}

        <AddColumnButton handleAddColumn={handleAddColumn} />
      </div>
    </div>
  );
};

export default DashboardPage;
