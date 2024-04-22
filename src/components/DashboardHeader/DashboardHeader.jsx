import { Icon } from '../../components/Icon/Icon.jsx';
import s from './DashboardHeader.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../redux/boards/boardsSlice';

const DashboardHeader = () => {
  const { name } = useSelector(selectCurrentBoard);

  return (
    <div className={s.topWrapper}>
      <h2 className={s.boardTitle}>{name}</h2>
      <button className={s.filterBtn}>
        <Icon id="filter" className={s.filterIcon} size={16} />
        Filters
      </button>
    </div>
  );
};

export default DashboardHeader;
