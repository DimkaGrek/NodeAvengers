import { Icon } from '../../components/Icon/Icon.jsx';
import s from './DashboardHeader.module.css';

const DashboardHeader = () => {
  const boardTitle = 'Project office';
  return (
    <div className={s.topWrapper}>
      <h2 className={s.boardTitle}>{boardTitle}</h2>
      <button className={s.filterBtn}>
        <Icon id="filter" className={s.filterIcon} size={16} />
        Filters
      </button>
    </div>
  );
};

export default DashboardHeader;
