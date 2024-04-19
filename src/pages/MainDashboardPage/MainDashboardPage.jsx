import { Icon } from '../../components/Icon/Icon.jsx';
import s from './MainDashboardPage.module.css';
import { AddButton } from '../../components/AddButton/AddButton.jsx';

const MainDashboardPage = () => {
  const boardTitle = 'Project office';
  const emptyBoardButtonTitle = 'Add another column';
  return (
    <div className="container">
      <div className={s.topWrapper}>
        <h2 className={s.boardTitle}>{boardTitle}</h2>
        <button className={s.filterBtn}>
          <Icon id="filter" className={s.filterIcon} size={16} />
          Filters
        </button>
      </div>
      <button className={s.addColBtn}>
        <AddButton color="light" width={28} height={28} iconSize={14} />
        {emptyBoardButtonTitle}
      </button>
    </div>
  );
};

export default MainDashboardPage;
