import { useSelector } from 'react-redux';

import { Icon } from '../../components/Icon/Icon.jsx';
import Filters from '../Filters/Filters.jsx';
import { ModalFilters } from '../ModalFilters/ModalFilters.jsx';

import { selectCurrentBoard } from '../../redux/boards/boardsSlice';
import { useModal } from '../../hooks/useModal.js';
import { selectFilter } from '../../redux/filter/slice.js';
import { getColorByPriority } from '../../helpers/getColorByPriority.js';
import s from './DashboardHeader.module.css';

const DashboardHeader = () => {
  const board = useSelector(selectCurrentBoard);
  const [isModalFilters, toggleIsModalFilters] = useModal();
  const filter = useSelector(selectFilter);
  const indicator = getColorByPriority(filter);

  return (
    <>
      <div className={s.topWrapper}>
        <h2 className={s.boardTitle}>{board && board.name}</h2>
        <div className={s.filterWrapper}>
          {filter !== 'Show all' && (
            <div
              className={s.filterIndicator}
              style={{ backgroundColor: `${indicator}` }}
            ></div>
          )}
          <button className={s.filterBtn} onClick={toggleIsModalFilters}>
            <Icon id="filter" className={s.filterIcon} size={16} />
            Filters
          </button>
        </div>
      </div>
      {isModalFilters && (
        <ModalFilters toggleModal={toggleIsModalFilters} title="Filters">
          <Filters toggleModal={toggleIsModalFilters} />
        </ModalFilters>
      )}
    </>
  );
};

export default DashboardHeader;
