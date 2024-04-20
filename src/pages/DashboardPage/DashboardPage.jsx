import s from './DashboardPage.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.jsx';
import { useState } from 'react';
import CardsColumn from '../../components/CardsColumn/CardsColumn.jsx';

const DashboardPage = () => {
  const [isAddColBtn, setIsAddColBtn] = useState(false);

  const emptyBoardAddButtonTitle = 'Add column';
  // const fillBoardAddButtonTitle = 'Add another column';

  return (
    <div className="container">
      <DashboardHeader />

      {isAddColBtn && (
        <button className={s.addColBtn}>
          <AddButton color="light" width={28} height={28} iconSize={14} />
          {emptyBoardAddButtonTitle}
        </button>
      )}

      <div className={s.columnsContainer}>
        <CardsColumn />
      </div>
    </div>
  );
};

export default DashboardPage;
