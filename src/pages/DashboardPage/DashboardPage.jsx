import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  DashboardHeader,
  CardsColumn,
  Button,
  Modal,
  ColumnForm,
  Icon,
} from '../../components';

import { selectCurrentBoard } from '../../redux/boards/boardsSlice.js';
import { getFilteredBoard } from '../../helpers';
import { selectFilter } from '../../redux/filter/slice';
import { getBoard, getBoards } from '../../redux/boards/boardsOperations.js';
import { useModal } from '../../hooks';

import s from './DashboardPage.module.css';

const DashboardPage = () => {
  const { boardName } = useParams();
  const [isAddColumnModal, toggleIsAddColumnModal] = useModal();
  const currentBoard = useSelector(selectCurrentBoard);

  const filter = useSelector(selectFilter);
  const [filteredBoard, setFilteredBoard] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards())
      .unwrap()
      .then(data => {
        dispatch(getBoard({ data, boardName }));
      })
      .catch(() =>
        toast.error('Something went wrong. Reload page or try again late!')
      );
  }, [dispatch, boardName]);

  useEffect(() => {
    if (currentBoard) {
      setFilteredBoard(getFilteredBoard(currentBoard, filter));
    }
  }, [currentBoard, filter]);

  const buttonLabel = currentBoard?.columns?.length
    ? 'Add another column'
    : 'Add column';

  return (
    filteredBoard && (
      <div className="container">
        <DashboardHeader />
        <div className={s.columnsContainer}>
          {filteredBoard.columns[0]?._id &&
            filteredBoard.columns.map(column => (
              <CardsColumn key={column._id} column={column} />
            ))}

          <Button
            className={s.addColBtn}
            type="button"
            onClick={() => toggleIsAddColumnModal()}
          >
            <span className={s.addColBtnIcon}>
              <Icon id="plus" className={s.buttonIconPlus} size={12} />
            </span>
            {buttonLabel}
          </Button>
        </div>
        {isAddColumnModal && (
          <Modal title={'Add column'} toggleModal={toggleIsAddColumnModal}>
            <ColumnForm toggleModal={toggleIsAddColumnModal} />
          </Modal>
        )}
      </div>
    )
  );
};

export default DashboardPage;
