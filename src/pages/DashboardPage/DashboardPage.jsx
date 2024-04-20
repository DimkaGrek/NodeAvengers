import s from './DashboardPage.module.css';

import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import { useState } from 'react';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';
import AddColumnButton from '../../components/AddColumnButton/AddColumnButton.jsx';

const DashboardPage = () => {
  const [isAddColBtn, setIsAddColBtn] = useState(true);

  return (
    <div className="container">
      <DashboardHeader />

      <div className={s.columnsContainer}>
        <CardsColumn />
        <CardsColumn />
        {isAddColBtn && <AddColumnButton />}
      </div>
    </div>
  );
};

export default DashboardPage;
